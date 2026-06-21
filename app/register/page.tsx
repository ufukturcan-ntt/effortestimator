export default function RegisterPage() {
  return (
    <main style={{ maxWidth: 480, margin: "80px auto", fontFamily: "Arial" }}>
      <h1>Kayıt Ol</h1>
      <form method="post" action="/api/register">
        <div style={{ marginBottom: 12 }}>
          <label>Ad Soyad</label>
          <br />
          <input name="name" required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>E-posta</label>
          <br />
          <input
            name="email"
            type="email"
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Şifre</label>
          <br />
          <input
            name="password"
            type="password"
            required
            minLength={8}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 16px" }}>
          Kayıt Ol
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Sadece @nttdata.com uzantılı e-posta adresleri kayıt olabilir.
      </p>
    </main>
  );
}
