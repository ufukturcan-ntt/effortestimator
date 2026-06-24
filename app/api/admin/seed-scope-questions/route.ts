import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const questions = [
  {
    code: "SCOPE_COMPANY_CODE_COUNT",
    category: "GENERAL",
    question: "Scope kapsamında kaç şirket kodu yer alacak?",
    answerType: "NUMBER",
    sortOrder: 10,
    options: [],
  },
  {
    code: "SCOPE_PLANT_COUNT",
    category: "GENERAL",
    question: "Scope kapsamında kaç üretim yeri yer alacak?",
    answerType: "NUMBER",
    sortOrder: 20,
    options: [],
  },
  {
    code: "SCOPE_USER_COUNT",
    category: "GENERAL",
    question: "Scope kapsamında kaç SAP kullanıcısı olacak?",
    answerType: "NUMBER",
    sortOrder: 30,
    options: [],
  },
  {
    code: "FASHION_VERTICAL_BUSINESS",
    category: "INDUSTRY",
    question: "Fashion Vertical Business kullanılacak mı?",
    answerType: "YES_NO",
    industry: "Fashion",
    sortOrder: 100,
    options: [
      { value: "YES", label: "Evet", effort: 10, sortOrder: 1 },
      { value: "NO", label: "Hayır", effort: 0, sortOrder: 2 },
    ],
  },
  {
    code: "STEEL_CERTIFICATE_PROCESS",
    category: "INDUSTRY",
    question: "Demir & Çelik kalite/sertifika süreçleri kapsamda mı?",
    answerType: "YES_NO",
    industry: "Demir & Çelik",
    sortOrder: 110,
    options: [
      { value: "YES", label: "Evet", effort: 8, sortOrder: 1 },
      { value: "NO", label: "Hayır", effort: 0, sortOrder: 2 },
    ],
  },
  {
    code: "BROWNFIELD_CVI",
    category: "IMPLEMENTATION",
    question: "CVI dönüşüm karmaşıklığı kapsamda mı?",
    answerType: "YES_NO",
    implementationType: "Brownfield",
    sortOrder: 200,
    options: [
      { value: "YES", label: "Evet", effort: 10, sortOrder: 1 },
      { value: "NO", label: "Hayır", effort: 0, sortOrder: 2 },
    ],
  },
];

export async function GET() {
  for (const item of questions) {
    const question = await prisma.scopeQuestion.upsert({
      where: { code: item.code },
      update: {
        category: item.category,
        question: item.question,
        answerType: item.answerType,
        sortOrder: item.sortOrder,
        isActive: true,
        industry: item.industry ?? null,
        implementationType: item.implementationType ?? null,
      },
      create: {
        code: item.code,
        category: item.category,
        question: item.question,
        answerType: item.answerType,
        sortOrder: item.sortOrder,
        isActive: true,
        industry: item.industry ?? null,
        implementationType: item.implementationType ?? null,
      },
    });

    await prisma.scopeQuestionOption.deleteMany({
      where: { questionId: question.id },
    });

    for (const option of item.options) {
      await prisma.scopeQuestionOption.create({
        data: {
          questionId: question.id,
          value: option.value,
          label: option.label,
          effort: option.effort,
          sortOrder: option.sortOrder,
        },
      });
    }
  }

  return NextResponse.json({
    success: true,
    count: questions.length,
  });
}
