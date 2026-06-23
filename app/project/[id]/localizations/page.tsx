import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const countries = ["Türkiye", "Rusya", "Birleşik Arap Emirlikleri", "Suudi Arabistan", "Almanya", "Diğer"];

export default async function LocalizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { localizations: true },
  });

  if (!project) return <main style={{ padding: 40 }}>Proje bulunamadı.</main>;

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Localization Selection</h1>
      <h2>{project.projectNo} - {project.projectName}</h2>

      <form method="post" action="/api/localizations/save">
        <input type="hidden" name="projectId" value={project.id} />

        {countries.map((country) => {
          const checked = project.localizations.some((item) => item.country === country);

          return (
            <div key={country} style={{ marginBottom: 10 }}>
              <label>
                <input type="checkbox" name="countries" value={country} defaultChecked={checked} /> {country}
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
