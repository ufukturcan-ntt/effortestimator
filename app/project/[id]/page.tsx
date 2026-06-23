import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Çalışma bulunamadı</h1>
        <a href="/dashboard">Dashboard&apos;a dön</a>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>{project.projectNo}</h1>
      <h2>{project.projectName}</h2>

      <table border={1} cellPadding={8} cellSpacing={0}>
        <tbody>
          <tr><td>Müşteri</td><td>{project.customer}</td></tr>
          <tr><td>Dil</td><td>{project.language}</td></tr>
          <tr><td>Tarih</td><td>{project.projectDate.toLocaleDateString("tr-TR")}</td></tr>
          <tr><td>Endüstri</td><td>{project.industry}</td></tr>
          <tr><td>Implementasyon Türü</td><td>{project.implementationType}</td></tr>
          <tr><td>Sistem Türü</td><td>{project.systemType}</td></tr>
          <tr><td>Hazırlayan</td><td>{project.preparedBy}</td></tr>
          <tr><td>Versiyon</td><td>{project.version}</td></tr>
          <tr><td>Notlar</td><td>{project.notes || "-"}</td></tr>
        </tbody>
      </table>

      <div style={{ marginTop: 24 }}>
        <a href={`/project/${project.id}/scope`}>Scope&apos;a Devam Et →</a>
        <br />
        <br />
        <a href="/dashboard">Dashboard&apos;a dön</a>
      </div>
    </main>
  );
}
