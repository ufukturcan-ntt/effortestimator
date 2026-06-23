import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const projectId = String(formData.get("projectId") || "");
  const countries = formData.getAll("countries");

  await prisma.projectLocalization.deleteMany({
    where: { projectId },
  });

  for (const country of countries) {
    await prisma.projectLocalization.create({
      data: {
        projectId,
        country: String(country),
      },
    });
  }

  return NextResponse.redirect(
    new URL(`/project/${projectId}/developments`, request.url),
    303
  );
}
