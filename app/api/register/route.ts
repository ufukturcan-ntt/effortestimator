import { NextResponse } from "next/server";
import { hashPassword, isAllowedEmailDomain } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Tüm alanlar zorunludur." },
      { status: 400 }
    );
  }

  if (!isAllowedEmailDomain(email)) {
    return NextResponse.json(
      { error: "Sadece @nttdata.com e-posta adresleri kayıt olabilir." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Şifre en az 8 karakter olmalıdır." },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Bu e-posta adresi zaten kayıtlı." },
      { status: 409 }
    );
  }

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await hashPassword(password),
      status: "PENDING",
      role: "USER",
    },
  });

  return NextResponse.redirect(new URL("/register/success", request.url));
}
