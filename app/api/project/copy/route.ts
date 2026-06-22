import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function generateProjectNo() {
  const year = new Date().getFullYear();

  const count = await prisma.project.count({
    where: {
      projectNo: {
        startsWith: `EST-${year}-`,
      },
    },
  });

  return `EST-${year}-${String(count + 1).padStart(6, "0")}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const projectId = String(formData.get("projectId") || "");

  if (!projectId) {
    return NextResponse.json(
      { error: "Referans alınacak çalışma bilgisi eksik." },
      { status: 400 }
    );
  }

  const sourceProject = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!sourceProject) {
    return NextResponse.json(
      { error: "Referans alınacak çalışma bulunamadı." },
      { status: 404 }
    );
  }

  const copiedProject = await prisma.project.create({
    data: {
      projectNo: await generateProjectNo(),
      projectName: `${sourceProject.projectName} - Kopya`,
      customer: sourceProject.customer,
      status: "DRAFT",
      language: sourceProject.language,
      projectDate: new Date(),
      industry: sourceProject.industry,
      implementationType: sourceProject.implementationType,
      systemType: sourceProject.systemType,
      preparedBy: sourceProject.preparedBy,
      version: sourceProject.version,
      notes: sourceProject.notes,
      createdById: sourceProject.createdById,
    },
  });

  return NextResponse.redirect(
    new URL(`/project/${copiedProject.id}`, request.url),
    303
  );
}
