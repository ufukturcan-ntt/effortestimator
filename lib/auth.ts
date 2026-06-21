import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export function isAllowedEmailDomain(email: string) {
  return email.toLowerCase().endsWith("@nttdata.com");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
}
