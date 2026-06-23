import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CataloguePage() {
  const items = await prisma.effortCatalogue.findMany({
    orderBy: [
      { category: "asc" },
      { code: "asc" },
    ],
  });

  return (
    <main style={{ maxWidth: 1000, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Effort Catalogue</h1>

      <table
        border={1}
        cellPadding={8}
        cellSpacing={0}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Kod</th>
            <th>Ad</th>
            <th>Efor</th>
            <th>Aktif</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.effort}</td>
              <td>{item.isActive ? "Evet" : "Hayır"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: 24 }}>
        <a href="/admin">Admin ekranına dön</a>
      </p>
    </main>
  );
}
