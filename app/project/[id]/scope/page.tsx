import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const baseQuestions = [
  "Scope kapsamında kaç şirket kodu yer alacak?",
  "Scope kapsamında kaç üretim yeri yer alacak?",
  "Scope kapsamında kaç depo yeri yer alacak?",
  "Scope kapsamında kaç SAP kullanıcısı olacak?",
  "Scope kapsamında kaç ülke yer alacak?"
];

const fashionQuestions = [
  "Fashion Vertical Business kullanılacak mı?",
  "Beden-renk-varyant yapısı kullanılacak mı?"
];

const steelQuestions = [
  "Demir & Çelik sektörüne özel üretim süreçleri var mı?",
  "Kalite/sertifika süreçleri kapsamda mı?"
];

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

  const questions = [...baseQuestions];

  if (project.industry === "Fashion") {
    questions.push(...fashionQuestions);
  }

  if (project.industry === "Demir & Çelik") {
    questions.push(...steelQuestions);
  }

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Scope</h1>
      <h2>{project.projectNo} - {project.projectName}</h2>

      <form method="post" action="/api/scope/save">
        <input type="hidden" name="projectId" value={project.id} />

        {questions.map((question) => {
          const existing = project.scopeAnswers.find(
            (item) => item.question === question
          );

          return (
            <div key={question} style={{ marginBottom: 16 }}>
              <label>{question} *</label>
              <br />
              <input
                name={question}
                required
                defaultValue={existing?.answer || ""}
                style={{ width: "100%", padding: 8 }}
              />
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
