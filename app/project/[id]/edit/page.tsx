import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const languageOptions = [
  "Türkçe",
  "İngilizce",
];

const industryOptions = [
  "Otomotiv",
  "Demir & Çelik",
  "Fashion",
  "Üretim",
  "Perakende",
  "Enerji",
  "Diğer",
];

const implementationTypeOptions = [
  "Greenfield",
  "Brownfield",
  "Rollout",
  "Conversion",
  "Template Rollout",
];

const systemTypeOptions = [
  "SAP S/4HANA On-Premise",
  "SAP S/4HANA Private Cloud",
  "SAP S/4HANA Public Cloud",
  "SAP ECC",
  "Diğer",
];

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    return (
      <main style={{ padding: 40 }}>
        Çalışma bulunamadı.
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Project Information Düzenle</h1>

      <form method="post" action="/api/project/update">
        <input
          type="hidden"
          name="projectId"
          value={project.id}
        />

        <div style={{ marginBottom: 12 }}>
          <label>Müşteri İsmi *</label>
          <br />
          <input
            name="customer"
            required
            defaultValue={project.customer}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Proje İsmi *</label>
          <br />
          <input
            name="projectName"
            required
            defaultValue={project.projectName}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Dil *</label>
          <br />
          <select
            name="language"
            defaultValue={project.language}
            style={{ width: "100%", padding: 8 }}
          >
            {languageOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Tarih *</label>
          <br />
          <input
            type="date"
            name="projectDate"
            required
            defaultValue={project.projectDate
              .toISOString()
              .slice(0, 10)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Endüstri *</label>
          <br />
          <select
            name="industry"
            defaultValue={project.industry}
            style={{ width: "100%", padding: 8 }}
          >
            {industryOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Implementasyon Türü *</label>
          <br />
          <select
            name="implementationType"
            defaultValue={project.implementationType}
            style={{ width: "100%", padding: 8 }}
          >
            {implementationTypeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Sistem Türü *</label>
          <br />
          <select
            name="systemType"
            defaultValue={project.systemType}
            style={{ width: "100%", padding: 8 }}
          >
            {systemTypeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Hazırlayan *</label>
          <br />
          <input
            name="preparedBy"
            required
            defaultValue={project.preparedBy}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Versiyon *</label>
          <br />
          <input
            name="version"
            required
            defaultValue={project.version}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Notlar</label>
          <br />
          <textarea
            name="notes"
            defaultValue={project.notes || ""}
            style={{
              width: "100%",
              padding: 8,
              minHeight: 100,
            }}
          />
        </div>

        <button type="submit">
          Kaydet
        </button>
      </form>
    </main>
  );
}
