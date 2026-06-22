const languageOptions = ["Türkçe", "İngilizce"];

const industryOptions = [
  "Otomotiv",
  "Demir & Çelik",
  "Fashion",
  "Üretim",
  "Perakende",
  "Enerji",
  "Diğer"
];

const implementationTypeOptions = [
  "Greenfield",
  "Brownfield",
  "Rollout",
  "Conversion",
  "Template Rollout"
];

const systemTypeOptions = [
  "SAP S/4HANA On-Premise",
  "SAP S/4HANA Private Cloud",
  "SAP S/4HANA Public Cloud",
  "SAP ECC",
  "Diğer"
];

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>{label} *</label>
      <br />
      <select name={name} required defaultValue="" style={{ width: "100%", padding: 8 }}>
        <option value="" disabled>Seçiniz</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default function NewProjectPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Project Information</h1>

      <form method="post" action="/api/project/create">
        <SelectField name="language" label="Dil" options={languageOptions} />

        <div style={{ marginBottom: 12 }}>
          <label>Müşteri İsmi *</label>
          <br />
          <input name="customer" required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Proje İsmi *</label>
          <br />
          <input name="projectName" required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Tarih *</label>
          <br />
          <input name="projectDate" type="date" required style={{ width: "100%", padding: 8 }} />
        </div>

        <SelectField name="industry" label="Endüstri" options={industryOptions} />
        <SelectField name="implementationType" label="Implementasyon Türü" options={implementationTypeOptions} />
        <SelectField name="systemType" label="Sistem Türü" options={systemTypeOptions} />

        <div style={{ marginBottom: 12 }}>
          <label>Hazırlayan *</label>
          <br />
          <input name="preparedBy" required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Versiyon *</label>
          <br />
          <input name="version" required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Notlar</label>
          <br />
          <textarea name="notes" style={{ width: "100%", padding: 8 }} />
        </div>

        <button type="submit" style={{ padding: "10px 16px" }}>
          Kaydet ve Devam Et
        </button>
      </form>
    </main>
  );
}
