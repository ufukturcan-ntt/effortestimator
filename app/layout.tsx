export const metadata = {
  title: "EffortEstimator",
  description: "SAP Sales Effort Estimator"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
