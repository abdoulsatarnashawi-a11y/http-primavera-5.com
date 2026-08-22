import { prisma } from './prisma';

export interface BackupPayload {
  version: 1;
  exportedAt: string;
  settings: Awaited<ReturnType<typeof prisma.siteSettings.findUnique>>;
  products: Awaited<ReturnType<typeof prisma.product.findMany>>;
  categories: string[];
}

export async function collectBackupPayload(): Promise<BackupPayload> {
  const [settings, products] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 'main' } }),
    prisma.product.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    settings,
    products,
    categories,
  };
}

export async function restoreBackupPayload(payload: BackupPayload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Невалиден файл за възстановяване');
  }

  if (payload.settings) {
    const { id: _id, ...settingsData } = payload.settings;
    await prisma.siteSettings.upsert({
      where: { id: 'main' },
      update: settingsData,
      create: { id: 'main', ...settingsData },
    });
  }

  if (Array.isArray(payload.products)) {
    await prisma.$transaction(async (tx) => {
      const backupIds = new Set(payload.products.map((p) => p.id));

      for (const product of payload.products) {
        const {
          id,
          name,
          description,
          image,
          brand,
          model,
          category,
          specs,
          retailPrice,
          wholesalePrice,
          stock,
          active,
          createdAt,
          updatedAt,
        } = product;

        await tx.product.upsert({
          where: { id },
          update: {
            name,
            description,
            image,
            brand,
            model,
            category,
            specs,
            retailPrice,
            wholesalePrice,
            stock,
            active,
            updatedAt,
          },
          create: {
            id,
            name,
            description,
            image,
            brand,
            model,
            category,
            specs,
            retailPrice,
            wholesalePrice,
            stock,
            active,
            createdAt,
            updatedAt,
          },
        });
      }

      await tx.product.updateMany({
        where: { id: { notIn: Array.from(backupIds) } },
        data: { active: false },
      });
    });
  }
}
