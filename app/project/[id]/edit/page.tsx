import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return <main style={{ padding: 40 }}>Çalışma bulunamadı.</main>;
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Project Information Düzenle</h1>

      <form method="post" action="/api/project/update">
        <input type="hidden" name="projectId" value={project.id} />

        {[
          ["customer", "Müşteri İsmi", project.customer],
          ["projectName", "Proje İsmi", project.projectName],
          ["language", "Dil", project.language],
          ["industry", "Endüstri", project.industry],
          ["implementationType", "Implementasyon Türü", project.implementationType],
          ["systemType", "Sistem Türü", project.systemType],
          ["preparedBy", "Hazırlayan", project.preparedBy],
          ["version", "Versiyon", project.version],
        ].map(([name, label, value]) => (
          <div key={name} style={{ marginBottom: 12 }}>
            <label>{label} *</label><br />
            <input name={name} required defaultValue={value} style={{ width: "100%", padding: 8 }} />
          </div>
        ))}

        <div style={{ marginBottom: 12 }}>
          <label>Tarih *</label><br />
          <input
            name="projectDate"
            type="date"
            required
            defaultValue={project.projectDate.toISOString().slice(0, 10)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Notlar</label><br />
          <textarea name="notes" defaultValue={project.notes || ""} style={{ width: "100%", padding: 8 }} />
        </div>

        <button type="submit">Kaydet</button>
      </form>
    </main>
  );
}
