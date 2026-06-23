import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const hypercareItems = [
  "Go Live Support",
  "Post Go Live Hypercare",
  "Key User Support",
  "Issue Resolution Support",
];

export default async function HypercarePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { hypercareItems: true },
  });

  if (!project) return <main style={{ padding: 40 }}>Proje bulunamadı.</main>;

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Hypercare & Go Live Support</h1>
      <h2>{project.projectNo} - {project.projectName}</h2>

      <form method="post" action="/api/hypercare/save">
        <input type="hidden" name="projectId" value={project.id} />

        {hypercareItems.map((item) => {
          const existing = project.hypercareItems.find((x) => x.item === item);

          return (
            <div key={item} style={{ marginBottom: 12 }}>
              <label>{item}</label>
              <br />
              <input
                name={item}
                type="number"
                min="0"
                defaultValue={existing?.effort || 0}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
          );
        })}

        <button type="submit">Kaydet ve Final Effort'a Git</button>
      </form>
    </main>
  );
}
