import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const projectId = String(formData.get("projectId") || "");

  if (!projectId) {
    return NextResponse.json(
      { error: "Çalışma bilgisi eksik." },
      { status: 400 }
    );
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  return NextResponse.redirect(new URL("/dashboard", request.url), 303);
}
