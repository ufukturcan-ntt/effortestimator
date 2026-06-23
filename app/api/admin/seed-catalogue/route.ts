import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const catalogueItems = [
  { category: "MODULE", code: "FI", name: "FI", effort: 10 },
  { category: "MODULE", code: "CO", name: "CO", effort: 8 },
  { category: "MODULE", code: "MM", name: "MM", effort: 10 },
  { category: "MODULE", code: "SD", name: "SD", effort: 10 },
  { category: "MODULE", code: "PP", name: "PP", effort: 10 },
  { category: "MODULE", code: "QM", name: "QM", effort: 6 },
  { category: "MODULE", code: "PM", name: "PM", effort: 6 },
  { category: "MODULE", code: "EWM", name: "EWM", effort: 12 },

  { category: "LOCALIZATION", code: "TR", name: "Türkiye", effort: 5 },
  { category: "LOCALIZATION", code: "RU", name: "Rusya", effort: 8 },
  { category: "LOCALIZATION", code: "UAE", name: "Birleşik Arap Emirlikleri", effort: 8 },
  { category: "LOCALIZATION", code: "SA", name: "Suudi Arabistan", effort: 8 },
  { category: "LOCALIZATION", code: "DE", name: "Almanya", effort: 6 },
  { category: "LOCALIZATION", code: "OTHER", name: "Diğer", effort: 5 },
];

export async function GET() {
  for (const item of catalogueItems) {
    await prisma.effortCatalogue.upsert({
      where: {
        category_code: {
          category: item.category,
          code: item.code,
        },
      },
      update: {
        name: item.name,
        effort: item.effort,
        isActive: true,
      },
      create: item,
    });
  }

  return NextResponse.json({
    success: true,
    count: catalogueItems.length,
  });
}
