import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = String(formData.get("userId") || "");

  if (!userId) {
    return NextResponse.json(
      { error: "Kullanıcı bilgisi eksik." },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: "APPROVED",
    },
  });

  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
