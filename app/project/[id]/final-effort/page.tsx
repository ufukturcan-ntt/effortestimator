import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FinalEffortPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

const project = await prisma.project.findUnique({
  where: { id },
  include: {
    modules: true,
    localizations: true,
    developments: true,
    hypercareItems: true,
    scopeAnswers: true,
  },
});

  if (!project) {
    return <main style={{ padding: 40 }}>Proje bulunamadı.</main>;
  }

  const catalogue = await prisma.effortCatalogue.findMany({
    where: {
      isActive: true,
    },
  });

  function getCatalogueEffort(category: string, name: string) {
    return (
      catalogue.find(
        (item) => item.category === category && item.name === name
      )?.effort ?? 0
    );
  }

const scopeQuestions = await prisma.scopeQuestion.findMany({
  include: {
    options: true,
  },
});
  
  const moduleEffort = project.modules.map((item) => ({
    group: "Project Effort",
    item: item.module,
    effort: getCatalogueEffort("MODULE", item.module),
  }));

  const hypercareEffort = project.hypercareItems.map((item) => ({
    group: "Project Effort",
    item: item.item,
    effort: item.effort,
  }));

  const projectEffort = [...moduleEffort, ...hypercareEffort];

  const localizationEffort = project.localizations.map((item) => ({
    group: "Localization Effort",
    item: item.country,
    effort: getCatalogueEffort("LOCALIZATION", item.country),
  }));

const scopeEffort = project.scopeAnswers.map((answer) => {
  const question = scopeQuestions.find(
    (q) => q.code === answer.question
  );

  const option = question?.options.find(
    (o) => o.value === answer.answer
  );

  return {
    group: "Scope Effort",
    item: question?.question || answer.question,
    effort: option?.effort ?? 0,
  };
});
  
  const developmentEffort = project.developments.map((item) => ({
    group: "Development Effort",
    item: `${item.type} - ${item.description}`,
    effort: item.quantity * item.effort,
  }));

const rows = [
  ...projectEffort,
  ...scopeEffort,
  ...localizationEffort,
  ...developmentEffort,
];

  const projectTotal = projectEffort.reduce((sum, row) => sum + row.effort, 0);
  const localizationTotal = localizationEffort.reduce((sum, row) => sum + row.effort, 0);
<tr>
  <td colSpan={2}>
    <strong>Scope Effort Toplamı</strong>
  </td>
  <td>
    <strong>{scopeTotal}</strong>
  </td>
</tr>
  
  const developmentTotal = developmentEffort.reduce((sum, row) => sum + row.effort, 0);
  const total = rows.reduce((sum, row) => sum + row.effort, 0);
  const scopeTotal = scopeEffort.reduce((sum, row) => sum + row.effort,0);
  
  return (
    <main style={{ maxWidth: 1000, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Final Effort</h1>
      <h2>{project.projectNo} - {project.projectName}</h2>

      <table
        border={1}
        cellPadding={8}
        cellSpacing={0}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Grup</th>
            <th>Kalem</th>
            <th>Efor</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.group}</td>
              <td>{row.item}</td>
              <td>{row.effort}</td>
            </tr>
          ))}

          <tr>
            <td colSpan={2}><strong>Project Effort Toplamı</strong></td>
            <td><strong>{projectTotal}</strong></td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Localization Effort Toplamı</strong></td>
            <td><strong>{localizationTotal}</strong></td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Development Effort Toplamı</strong></td>
            <td><strong>{developmentTotal}</strong></td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Genel Toplam</strong></td>
            <td><strong>{total}</strong></td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: 24 }}>
        <a href={`/project/${project.id}`}>Project Information</a>
        {" | "}
        <a href={`/project/${project.id}/scope`}>Scope</a>
        {" | "}
        <a href={`/project/${project.id}/modules`}>Modules</a>
        {" | "}
        <a href={`/project/${project.id}/localizations`}>Localization</a>
        {" | "}
        <a href={`/project/${project.id}/developments`}>Development</a>
        {" | "}
        <a href={`/project/${project.id}/hypercare`}>Hypercare</a>
        {" | "}
        <a href="/dashboard">Dashboard</a>
      </div>
    </main>
  );
}
