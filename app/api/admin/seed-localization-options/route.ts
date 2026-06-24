import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const countries = [
  { value: "TR", label: "Türkiye", sortOrder: 1 },
  { value: "RU", label: "Rusya", sortOrder: 2 },
  { value: "UAE", label: "Birleşik Arap Emirlikleri", sortOrder: 3 },
  { value: "SA", label: "Suudi Arabistan", sortOrder: 4 },
  { value: "DE", label: "Almanya", sortOrder: 5 },
  { value: "OTHER", label: "Diğer", sortOrder: 99 },
];

export async function GET() {
  for (const country of countries) {
    await prisma.selectionOption.upsert({
      where: {
        category_value: {
          category: "LOCALIZATION",
          value: country.value,
        },
      },
      update: {
        label: country.label,
        sortOrder: country.sortOrder,
        isActive: true,
      },
      create: {
        category: "LOCALIZATION",
        value: country.value,
        label: country.label,
        sortOrder: country.sortOrder,
        isActive: true,
      },
    });
  }

  return NextResponse.json({
    success: true,
    count: countries.length,
  });
}
