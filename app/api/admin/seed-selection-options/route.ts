import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const options = [
  { category: "LANGUAGE", value: "TR", label: "Türkçe", sortOrder: 1 },
  { category: "LANGUAGE", value: "EN", label: "İngilizce", sortOrder: 2 },

  { category: "INDUSTRY", value: "AUTOMOTIVE", label: "Otomotiv", sortOrder: 1 },
  { category: "INDUSTRY", value: "STEEL", label: "Demir & Çelik", sortOrder: 2 },
  { category: "INDUSTRY", value: "FASHION", label: "Fashion", sortOrder: 3 },
  { category: "INDUSTRY", value: "MANUFACTURING", label: "Üretim", sortOrder: 4 },
  { category: "INDUSTRY", value: "RETAIL", label: "Perakende", sortOrder: 5 },
  { category: "INDUSTRY", value: "ENERGY", label: "Enerji", sortOrder: 6 },
  { category: "INDUSTRY", value: "OTHER", label: "Diğer", sortOrder: 99 },

  { category: "IMPLEMENTATION_TYPE", value: "GREENFIELD", label: "Greenfield", sortOrder: 1 },
  { category: "IMPLEMENTATION_TYPE", value: "BROWNFIELD", label: "Brownfield", sortOrder: 2 },
  { category: "IMPLEMENTATION_TYPE", value: "ROLLOUT", label: "Rollout", sortOrder: 3 },
  { category: "IMPLEMENTATION_TYPE", value: "CONVERSION", label: "Conversion", sortOrder: 4 },
  { category: "IMPLEMENTATION_TYPE", value: "TEMPLATE_ROLLOUT", label: "Template Rollout", sortOrder: 5 },

  { category: "SYSTEM_TYPE", value: "S4_ON_PREM", label: "SAP S/4HANA On-Premise", sortOrder: 1 },
  { category: "SYSTEM_TYPE", value: "S4_PRIVATE_CLOUD", label: "SAP S/4HANA Private Cloud", sortOrder: 2 },
  { category: "SYSTEM_TYPE", value: "S4_PUBLIC_CLOUD", label: "SAP S/4HANA Public Cloud", sortOrder: 3 },
  { category: "SYSTEM_TYPE", value: "ECC", label: "SAP ECC", sortOrder: 4 },
  { category: "SYSTEM_TYPE", value: "OTHER", label: "Diğer", sortOrder: 99 },
];

export async function GET() {
  for (const option of options) {
    await prisma.selectionOption.upsert({
      where: {
        category_value: {
          category: option.category,
          value: option.value,
        },
      },
      update: {
        label: option.label,
        sortOrder: option.sortOrder,
        isActive: true,
      },
      create: option,
    });
  }

  return NextResponse.json({
    success: true,
    count: options.length,
  });
}
