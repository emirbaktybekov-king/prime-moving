
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getAdminFromToken(): Promise<any> {
  const cookieStore = cookies();
  const token = cookieStore.get('admin-token')?.value;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const admin = await prisma.admin.findUnique({
    where: { id: decoded.adminId },
    select: { id: true, email: true, fullName: true, status: true }
  });

  if (!admin || admin.status !== 'APPROVED') return null;

  return admin;
}

export async function requireAdmin() {
  const admin = await getAdminFromToken();
  if (!admin) {
    throw new Error('Unauthorized');
  }
  return admin;
}
