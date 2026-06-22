import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main style={{ maxWidth: 1000, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>EffortEstimator Dashboard</h1>

      <p>
        <a href="/project/new">+ Yeni Çalışma</a>
      </p>

      <h2>Çalışmalarım</h2>

      {projects.length === 0 ? (
        <p>Henüz çalışma bulunmuyor.</p>
      ) : (
        <table border={1} cellPadding={8} cellSpacing={0} style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Proje No</th>
              <th>Proje İsmi</th>
              <th>Müşteri</th>
              <th>Endüstri</th>
              <th>Durum</th>
              <th>Oluşturma Tarihi</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.projectNo}</td>
                <td>{project.projectName}</td>
                <td>{project.customer}</td>
                <td>{project.industry}</td>
                <td>{project.status}</td>
                <td>{project.createdAt.toLocaleDateString("tr-TR")}</td>
                <td>
                  <a href={`/project/${project.id}`}>Görüntüle</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
