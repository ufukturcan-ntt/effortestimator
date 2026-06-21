import { NextResponse } from "next/server";
import { getUserByEmail, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") || "");

  const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      { error: "Kullanıcı bulunamadı." },
      { status: 401 }
    );
  }

  const validPassword = await verifyPassword(
    password,
    user.passwordHash
  );

  if (!validPassword) {
    return NextResponse.json(
      { error: "Şifre hatalı." },
      { status: 401 }
    );
  }

  if (user.status !== "APPROVED") {
    return NextResponse.redirect(
      new URL("/pending-approval", request.url)
    );
  }

  return NextResponse.redirect(
    new URL("/dashboard", request.url)
  );
}
