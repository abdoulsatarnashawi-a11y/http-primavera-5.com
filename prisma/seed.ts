import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hashPassword('admin123');
  await prisma.user.upsert({
    where: { email: 'admin@primavera-5.com' },
    update: {},
    create: {
      email: 'admin@primavera-5.com',
      password: adminPassword,
      name: 'Администратор',
      role: 'admin',
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: { id: 'main' },
  });

  await prisma.visitorStats.upsert({
    where: { id: 'stats' },
    update: {},
    create: { id: 'stats', totalVisitors: 0, currentOnline: 0 },
  });

  const products = [
    {
      name: 'Спирачни накладки предни',
      description: 'Висококачествени спирачни накладки за предна ос. Отлично спиране при всякакви условия.',
      brand: 'BMW',
      model: 'E90 320d',
      category: 'Резервни части',
      specs: 'Материал: керамика\nДебелина: 17.5mm\nOEM: 34116855013',
      retailPrice: 45.99,
      wholesalePrice: 32.50,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
    },
    {
      name: 'Маслен филтър',
      description: 'Оригинален маслен филтър за двигатели 2.0 TDI.',
      brand: 'Volkswagen',
      model: 'Golf 7 2.0 TDI',
      category: 'Резервни части',
      specs: 'Тип: винтов\nВисочина: 78mm\nДиаметър: 76mm',
      retailPrice: 12.50,
      wholesalePrice: 8.90,
      stock: 120,
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff1f8?w=400',
    },
    {
      name: 'LED фарове комплект',
      description: 'Модерни LED фарове с дневни светлини. Plug & Play монтаж.',
      brand: 'Mercedes-Benz',
      model: 'C-Class W205',
      category: 'Електроника',
      specs: 'Тип: LED\nМощност: 35W\nЦвят: 6000K бяла',
      retailPrice: 289.00,
      wholesalePrice: 210.00,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
    },
    {
      name: 'Кожена калъф за волан',
      description: 'Премиум кожен калъф за волан с перфорация. Удобен хват.',
      brand: 'Audi',
      model: 'A4 B9',
      category: 'Интериор',
      specs: 'Материал: естествена кожа\nДиаметър: 38cm\nЦвят: черен',
      retailPrice: 35.00,
      wholesalePrice: 22.00,
      stock: 80,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
    },
    {
      name: 'Спойлер за багажник',
      description: 'Спортен спойлер за багажник, ABS пластмаса, боядисан.',
      brand: 'Toyota',
      model: 'Corolla E210',
      category: 'Екстериор',
      specs: 'Материал: ABS\nЦвят: небоядисан\nМонтаж: лепене',
      retailPrice: 89.99,
      wholesalePrice: 65.00,
      stock: 25,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
    },
    {
      name: 'Амортисьор преден',
      description: 'Газов амортисьор за предна ос. Подобрена стабилност.',
      brand: 'Ford',
      model: 'Focus MK3',
      category: 'Резервни части',
      specs: 'Тип: газов\nПозиция: преден ляв/десен\nOEM: 1772815',
      retailPrice: 67.50,
      wholesalePrice: 48.00,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
    },
    {
      name: 'Хром лайсни за прагове',
      description: 'Комплект хромирани лайсни за прагове. Неръждаема стомана.',
      brand: 'Opel',
      model: 'Astra K',
      category: 'Тунинг и стайлинг',
      specs: 'Материал: неръждаема стомана\nБрой: 4 бр.\nДължина: 60cm',
      retailPrice: 42.00,
      wholesalePrice: 28.50,
      stock: 60,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
    },
    {
      name: 'Моторно масло 5W-30',
      description: 'Синтетично моторно масло 5W-30. 5 литра.',
      brand: 'Renault',
      model: 'Clio V 1.0 TCe',
      category: 'Масла и течности',
      specs: 'Вискозитет: 5W-30\nОбем: 5L\nСпецификация: ACEA C3',
      retailPrice: 38.99,
      wholesalePrice: 28.00,
      stock: 200,
      image: 'https://images.unsplash.com/photo-1632823472965-9c1b0b0b0b0b?w=400',
    },
    {
      name: 'Bluetooth аудио адаптер',
      description: 'Безжичен Bluetooth адаптер за фабрично аудио. AUX вход.',
      brand: 'Peugeot',
      model: '308 T9',
      category: 'Аксесоари',
      specs: 'Bluetooth: 5.0\nДиапазон: 10m\nЗахранване: 12V',
      retailPrice: 24.99,
      wholesalePrice: 16.50,
      stock: 100,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
    },
    {
      name: 'Комплект инструменти за кола',
      description: '72-частен комплект инструменти за автомобил. Куфар.',
      brand: 'Универсален',
      model: 'Всички модели',
      category: 'Инструменти',
      specs: 'Брой части: 72\nМатериал: хром-ванадий\nКуфар: пластмаса',
      retailPrice: 55.00,
      wholesalePrice: 38.00,
      stock: 35,
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400',
    },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log('Seed completed!');
  console.log('Admin: admin@primavera-5.com / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
