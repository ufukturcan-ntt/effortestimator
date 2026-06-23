import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const developmentTypes = ["WF", "REP", "IF", "CONV", "ENH", "FORM"];
const complexities = ["Small", "Medium", "Large"];

export default async function DevelopmentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { developments: true },
  });

  if (!project) return <main style={{ padding: 40 }}>Proje bulunamadı.</main>;

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Development</h1>
      <h2>{project.projectNo} - {project.projectName}</h2>

      <form method="post" action="/api/developments/save">
        <input type="hidden" name="projectId" value={project.id} />

        <table border={1} cellPadding={8} cellSpacing={0} style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Tip</th>
              <th>Açıklama</th>
              <th>Adet</th>
              <th>Complexity</th>
              <th>Efor</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4].map((index) => {
              const existing = project.developments[index];

              return (
                <tr key={index}>
                  <td>
                    <select name={`type_${index}`} defaultValue={existing?.type || ""}>
                      <option value="">Seçiniz</option>
                      {developmentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input name={`description_${index}`} defaultValue={existing?.description || ""} />
                  </td>
                  <td>
                    <input name={`quantity_${index}`} type="number" min="1" defaultValue={existing?.quantity || 1} />
                  </td>
                  <td>
                    <select name={`complexity_${index}`} defaultValue={existing?.complexity || ""}>
                      <option value="">Seçiniz</option>
                      {complexities.map((complexity) => (
                        <option key={complexity} value={complexity}>{complexity}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input name={`effort_${index}`} type="number" min="0" defaultValue={existing?.effort || 0} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button type="submit" style={{ marginTop: 16 }}>
          Kaydet ve Final Effort'a Git
        </button>
      </form>
    </main>
  );
}
