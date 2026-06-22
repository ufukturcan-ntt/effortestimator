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

  const language = String(formData.get("language") || "").trim();
  const customer = String(formData.get("customer") || "").trim();
  const projectName = String(formData.get("projectName") || "").trim();
  const projectDate = String(formData.get("projectDate") || "");
  const industry = String(formData.get("industry") || "").trim();
  const implementationType = String(formData.get("implementationType") || "").trim();
  const systemType = String(formData.get("systemType") || "").trim();
  const preparedBy = String(formData.get("preparedBy") || "").trim();
  const version = String(formData.get("version") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (
    !language ||
    !customer ||
    !projectName ||
    !projectDate ||
    !industry ||
    !implementationType ||
    !systemType ||
    !preparedBy ||
    !version
  ) {
    return NextResponse.json(
      { error: "Tüm zorunlu alanlar doldurulmalıdır." },
      { status: 400 }
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL || "ufuk.turcan@nttdata.com";

  const creator = await prisma.user.update({
    where: {
      email: adminEmail,
    },
    data: {
      role: "ADMIN",
      status: "APPROVED",
    },
  });

  const project = await prisma.project.create({
    data: {
      projectNo: await generateProjectNo(),
      language,
      customer,
      projectName,
      projectDate: new Date(projectDate),
      industry,
      implementationType,
      systemType,
      preparedBy,
      version,
      notes: notes || null,
      createdById: creator.id,
    },
  });

  return NextResponse.redirect(
    new URL(`/project/${project.id}`, request.url),
    303
  );
}
