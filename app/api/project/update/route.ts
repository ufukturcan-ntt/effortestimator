import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();

  const projectId = String(formData.get("projectId") || "");

  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      customer: String(formData.get("customer") || ""),
      projectName: String(formData.get("projectName") || ""),
      language: String(formData.get("language") || ""),
      projectDate: new Date(String(formData.get("projectDate") || "")),
      industry: String(formData.get("industry") || ""),
      implementationType: String(formData.get("implementationType") || ""),
      systemType: String(formData.get("systemType") || ""),
      preparedBy: String(formData.get("preparedBy") || ""),
      version: String(formData.get("version") || ""),
      notes: String(formData.get("notes") || "") || null,
    },
  });

  return NextResponse.redirect(
    new URL(`/project/${project.id}`, request.url),
    303
  );
}
