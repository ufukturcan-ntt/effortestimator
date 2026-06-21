export default function LoginPage() {
  return (
    <main style={{ maxWidth: 480, margin: "80px auto", fontFamily: "Arial" }}>
      <h1>Giriş Yap</h1>

      <form method="post" action="/api/login">
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
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 16px" }}>
          Giriş Yap
        </button>
      </form>

      <p style={{ marginTop: 20 }}>
        Hesabınız yok mu? <a href="/register">Kayıt Ol</a>
      </p>
    </main>
  );
}
