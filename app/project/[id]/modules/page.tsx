import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: string;
  };
}

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
}: Props) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!project) {
    return <div>Proje bulunamadı.</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Module Selection</h1>

      <h2>{project.projectNo}</h2>

      <form
        method="post"
        action="/api/modules/save"
      >
        <input
          type="hidden"
          name="projectId"
          value={project.id}
        />

        {modules.map((module) => (
          <div
            key={module}
            style={{ marginBottom: 10 }}
          >
            <label>
              <input
                type="checkbox"
                name="modules"
                value={module}
              />

              {" "}
              {module}
            </label>
          </div>
        ))}

        <br />

        <button type="submit">
          Kaydet ve Devam Et
        </button>
      </form>
    </div>
  );
}
