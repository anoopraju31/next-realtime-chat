import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

import { redis } from './lib/redis';
import { checkIsSecured } from './lib/env';

type RoomMetaData = {
  createdAt: number;
  connected: string[];
};

export const proxy = async (req: NextRequest) => {
  //? OVERVIEW: CHECK IF USER IS ALLOWED TO JOIN ROOM
  //! IF ALLOWED: LET THEM PASS
  //! IF NOT ALLOWED:  SEND THEM BACK TO LOBBY

  const pathname = req.nextUrl.pathname;
  const roomMatch = pathname.match(/^\/room\/([^/]+)$/);

  if (!roomMatch) return NextResponse.redirect(new URL('/', req.url));

  const roomId = roomMatch[1];
  const meta = await redis.hgetall<RoomMetaData>(`meta:${roomId}`);

  //   IF ROOM DOES NOT EXIST
  if (!meta) return NextResponse.redirect(new URL('/?error=room_not_found', req.url));

  const existingToken = req.cookies.get('x-auth-token')?.value;

  //   IF USER ALREADY CONNECTED TO ROOM
  if (existingToken && meta.connected.includes(existingToken)) return NextResponse.next();

  //   IF USER IS NOT ALLOWED TO JOIN ROOM
  if (meta.connected.length >= 2) return NextResponse.redirect(new URL('/?error=room_full', req.url));

  const response = NextResponse.next();
  const token = nanoid();

  response.cookies.set('x-auth-token', token, {
    path: '/',
    httpOnly: true,
    secure: checkIsSecured(),
    sameSite: 'strict',
  });

  await redis.hset(`meta:${roomId}`, {
    connected: [...meta.connected, token],
  });

  return response;
};

export const config = {
  matcher: '/room/:path*',
};
