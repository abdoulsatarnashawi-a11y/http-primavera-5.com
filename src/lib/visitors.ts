import { prisma } from './prisma';

export async function trackVisitor(sessionId: string) {
  let stats = await prisma.visitorStats.findUnique({ where: { id: 'stats' } });
  if (!stats) {
    stats = await prisma.visitorStats.create({
      data: { id: 'stats', totalVisitors: 0, currentOnline: 0 },
    });
  }

  const activeSessions = getActiveSessions();
  const isNew = !activeSessions.has(sessionId);

  if (isNew) {
    activeSessions.set(sessionId, Date.now());
    await prisma.visitorStats.update({
      where: { id: 'stats' },
      data: {
        totalVisitors: { increment: 1 },
        currentOnline: activeSessions.size,
      },
    });
  } else {
    activeSessions.set(sessionId, Date.now());
    await prisma.visitorStats.update({
      where: { id: 'stats' },
      data: { currentOnline: activeSessions.size },
    });
  }

  cleanupSessions(activeSessions);
  return prisma.visitorStats.findUnique({ where: { id: 'stats' } });
}

const globalSessions = globalThis as unknown as {
  activeSessions?: Map<string, number>;
};

function getActiveSessions(): Map<string, number> {
  if (!globalSessions.activeSessions) {
    globalSessions.activeSessions = new Map();
  }
  return globalSessions.activeSessions;
}

function cleanupSessions(sessions: Map<string, number>) {
  const now = Date.now();
  const timeout = 5 * 60 * 1000;
  Array.from(sessions.entries()).forEach(([id, time]) => {
    if (now - time > timeout) sessions.delete(id);
  });
}

export async function getVisitorStats() {
  let stats = await prisma.visitorStats.findUnique({ where: { id: 'stats' } });
  if (!stats) {
    stats = await prisma.visitorStats.create({
      data: { id: 'stats', totalVisitors: 0, currentOnline: 0 },
    });
  }
  const activeSessions = getActiveSessions();
  cleanupSessions(activeSessions);
  return {
    totalVisitors: stats.totalVisitors,
    currentOnline: Math.max(activeSessions.size, stats.currentOnline),
  };
}
