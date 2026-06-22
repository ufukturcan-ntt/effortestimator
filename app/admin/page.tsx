import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const pendingUsers = await prisma.user.findMany({
    where: {
      status: "PENDING",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Kullanıcı Onayları</h1>

      {pendingUsers.length === 0 ? (
        <p>Bekleyen kullanıcı bulunmuyor.</p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          cellSpacing={0}
          style={{ borderCollapse: "collapse", marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>E-posta</th>
              <th>Kayıt Tarihi</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt.toLocaleString("tr-TR")}</td>
                <td>
                  <form method="post" action="/api/admin/approve">
                    <input type="hidden" name="userId" value={user.id} />
                    <button type="submit">Approve</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={{ marginTop: 24 }}>
        <a href="/dashboard">Dashboard&apos;a git</a>
      </p>
    </main>
  );
}
