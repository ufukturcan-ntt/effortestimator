import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{project.projectNo}</h1>

      <h2>{project.projectName}</h2>

      <table
        border={1}
        cellPadding={8}
        style={{
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <tbody>
          <tr>
            <td>Müşteri</td>
            <td>{project.customer}</td>
          </tr>

          <tr>
            <td>Dil</td>
            <td>{project.language}</td>
          </tr>

          <tr>
            <td>Tarih</td>
            <td>{project.projectDate}</td>
          </tr>

          <tr>
            <td>Endüstri</td>
            <td>{project.industry}</td>
          </tr>

          <tr>
            <td>Implementasyon Türü</td>
            <td>{project.implementationType}</td>
          </tr>

          <tr>
            <td>Sistem Türü</td>
            <td>{project.systemType}</td>
          </tr>

          <tr>
            <td>Hazırlayan</td>
            <td>{project.preparedBy}</td>
          </tr>

          <tr>
            <td>Versiyon</td>
            <td>{project.version}</td>
          </tr>

          <tr>
            <td>Notlar</td>
            <td>{project.notes}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: 30 }}>
        <a href={`/project/${project.id}/scope`}>
          Scope'a Devam Et →
        </a>

        <br />
        <br />

        <a href="/dashboard">
          Dashboard'a dön
        </a>
      </div>
    </div>
  );
}
