import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ScopePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { scopeAnswers: true },
  });

  if (!project) {
    return <main style={{ padding: 40 }}>Çalışma bulunamadı.</main>;
  }

  const questions = await prisma.scopeQuestion.findMany({
    where: {
      isActive: true,
      OR: [
        {
          industry: null,
          implementationType: null,
          systemType: null,
        },
        {
          industry: project.industry,
        },
        {
          implementationType: project.implementationType,
        },
        {
          systemType: project.systemType,
        },
      ],
    },
    include: {
      options: {
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Scope</h1>
      <h2>{project.projectNo} - {project.projectName}</h2>

      <form method="post" action="/api/scope/save">
        <input type="hidden" name="projectId" value={project.id} />

        {questions.map((question) => {
          const existing = project.scopeAnswers.find(
            (item) => item.question === question.code
          );

          return (
            <div key={question.id} style={{ marginBottom: 16 }}>
              <label>{question.question} *</label>
              <br />

              {question.answerType === "NUMBER" ? (
                <input
                  name={question.code}
                  type="number"
                  required
                  defaultValue={existing?.answer || ""}
                  style={{ width: "100%", padding: 8 }}
                />
              ) : (
                <select
                  name={question.code}
                  required
                  defaultValue={existing?.answer || ""}
                  style={{ width: "100%", padding: 8 }}
                >
                  <option value="" disabled>
                    Seçiniz
                  </option>
                  {question.options.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}

        <button type="submit" style={{ padding: "10px 16px" }}>
          Kaydet ve Devam Et
        </button>
      </form>
    </main>
  );
}
