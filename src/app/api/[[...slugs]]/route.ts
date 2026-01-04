import { Elysia } from 'elysia';
import { nanoid } from 'nanoid';

import { redis } from '@/lib/redis';
import { authMiddleware } from './auth';

const ROOM_TTL_SECONDS = 60 * 10;

const rooms = new Elysia({
  prefix: '/room',
}).post('/create', async () => {
  const roomId = nanoid();

  await redis.hset(`meta:${roomId}`, {
    connected: [],
    createdAt: Date.now(),
  });

  await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);

  return { roomId };
});

const messages = new Elysia({
  prefix: '/message',
})
  .use(authMiddleware)
  .post('/', async ({ auth }) => {});

const app = new Elysia({ prefix: '/api' }).use(rooms).use(messages);

export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof app;
