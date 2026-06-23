import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const projectId = String(formData.get("projectId") || "");

  await prisma.projectDevelopment.deleteMany({
    where: { projectId },
  });

  for (let index = 0; index < 5; index++) {
    const type = String(formData.get(`type_${index}`) || "");
    const description = String(formData.get(`description_${index}`) || "");
    const quantity = Number(formData.get(`quantity_${index}`) || 0);
    const complexity = String(formData.get(`complexity_${index}`) || "");
    const effort = Number(formData.get(`effort_${index}`) || 0);

    if (!type || !description || !complexity || quantity <= 0) continue;

    await prisma.projectDevelopment.create({
      data: {
        projectId,
        type,
        description,
        quantity,
        complexity,
        effort,
      },
    });
  }

  return NextResponse.redirect(
    new URL(`/project/${projectId}/final-effort`, request.url),
    303
  );
}
