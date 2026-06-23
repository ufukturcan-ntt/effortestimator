import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const projectId = String(formData.get("projectId") || "");
  const modules = formData.getAll("modules");

  await prisma.projectModule.deleteMany({
    where: { projectId },
  });

  for (const module of modules) {
    await prisma.projectModule.create({
      data: {
        projectId,
        module: String(module),
      },
    });
  }

  return NextResponse.redirect(
    new URL(`/project/${projectId}/localizations`, request.url),
    303
  );
}
