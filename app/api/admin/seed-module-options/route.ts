import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const modules = [
  "FI", "CO", "MM", "SD", "PP", "QM", "PM", "PS",
  "EWM", "TM", "GTS", "MDG", "BW", "BPC", "SAC", "BTP"
];

export async function GET() {
  for (let index = 0; index < modules.length; index++) {
    const module = modules[index];

    await prisma.selectionOption.upsert({
      where: {
        category_value: {
          category: "MODULE",
          value: module,
        },
      },
      update: {
        label: module,
        sortOrder: index + 1,
        isActive: true,
      },
      create: {
        category: "MODULE",
        value: module,
        label: module,
        sortOrder: index + 1,
        isActive: true,
      },
    });
  }

  return NextResponse.json({
    success: true,
    count: modules.length,
  });
}
