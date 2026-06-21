export default function RegisterSuccessPage() {
  return (
    <main style={{ maxWidth: 640, margin: "80px auto", fontFamily: "Arial" }}>
      <h1>Kayıt Talebiniz Alındı</h1>
      <p>
        Kullanıcı kaydınız oluşturuldu. Admin onayı sonrasında sisteme giriş
        yapabilirsiniz.
      </p>
      <a href="/login">Giriş ekranına dön</a>
    </main>
  );
}
