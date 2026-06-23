import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const modules = [
  "FI",
  "CO",
  "MM",
  "SD",
  "PP",
  "QM",
  "PM",
  "PS",
  "EWM",
  "TM",
  "GTS",
  "MDG",
  "BW",
  "BPC"
];

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { modules: true },
  });

  if (!project) {
    return <main style={{ padding: 40 }}>Proje bulunamadı.</main>;
  }

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Module Selection</h1>
      <h2>{project.projectNo} - {project.projectName}</h2>

      <form method="post" action="/api/modules/save">
        <input type="hidden" name="projectId" value={project.id} />

        {modules.map((module) => {
          const checked = project.modules.some((item) => item.module === module);

          return (
            <div key={module} style={{ marginBottom: 10 }}>
              <label>
                <input
                  type="checkbox"
                  name="modules"
                  value={module}
                  defaultChecked={checked}
                />
                {" "}
                {module}
              </label>
            </div>
          );
        })}

        <button type="submit" style={{ marginTop: 16 }}>
          Kaydet ve Devam Et
        </button>
      </form>
    </main>
  );
}
