import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();

  const projectId = String(
    formData.get("projectId")
  );

  await prisma.scopeAnswer.deleteMany({
    where: {
      projectId,
    },
  });

  for (const [key, value] of formData.entries()) {
    if (key === "projectId") continue;

    await prisma.scopeAnswer.create({
      data: {
        projectId,
        question: key,
        answer: String(value),
      },
    });
  }

  return NextResponse.redirect(
    new URL(
      `/project/${projectId}/modules`,
      request.url
    ),
    303
  );
}
