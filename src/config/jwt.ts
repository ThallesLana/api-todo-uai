import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { CookieOptions } from 'express';

export type AuthTokenPayload = JwtPayload & {
  sub: string;
  role: 'user' | 'admin';
};

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

export const ACCESS_COOKIE_NAME = 'access_token';
export const REFRESH_COOKIE_NAME = 'refresh_token';

export function getJwtAccessSecret() {
  if (!accessSecret) {
    throw new Error('Missing JWT_ACCESS_SECRET in .env');
  }

  return accessSecret;
}

export function getJwtRefreshSecret() {
  if (!refreshSecret) {
    throw new Error('Missing JWT_REFRESH_SECRET in .env');
  }

  return refreshSecret;
}

export function signAccessToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, getJwtAccessSecret(), { expiresIn: '15m' });
}

export function signRefreshToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, getJwtRefreshSecret(), { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, getJwtAccessSecret()) as AuthTokenPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, getJwtRefreshSecret()) as AuthTokenPayload;
}

export function getAccessCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/',
    maxAge: 15 * 60 * 1000,
  };
}

export function getRefreshCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/api/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}
