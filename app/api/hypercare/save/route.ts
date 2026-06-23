import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const projectId = String(formData.get("projectId") || "");

  await prisma.projectHypercare.deleteMany({
    where: { projectId },
  });

  for (const [key, value] of formData.entries()) {
    if (key === "projectId") continue;

    const effort = Number(value || 0);

    if (effort > 0) {
      await prisma.projectHypercare.create({
        data: {
          projectId,
          item: key,
          effort,
        },
      });
    }
  }

  return NextResponse.redirect(
    new URL(`/project/${projectId}/final-effort`, request.url),
    303
  );
}
