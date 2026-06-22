export default function NewProjectPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Project Information</h1>

      <form method="post" action="/api/project/create">
        {[
          ["language", "Dil"],
          ["customer", "Müşteri İsmi"],
          ["projectName", "Proje İsmi"],
          ["industry", "Endüstri"],
          ["implementationType", "Implementasyon Türü"],
          ["systemType", "Sistem Türü"],
          ["preparedBy", "Hazırlayan"],
          ["version", "Versiyon"],
        ].map(([name, label]) => (
          <div key={name} style={{ marginBottom: 12 }}>
            <label>{label} *</label>
            <br />
            <input name={name} required style={{ width: "100%", padding: 8 }} />
          </div>
        ))}

        <div style={{ marginBottom: 12 }}>
          <label>Tarih *</label>
          <br />
          <input name="projectDate" type="date" required style={{ width: "100%", padding: 8 }} />
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
