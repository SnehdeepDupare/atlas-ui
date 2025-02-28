export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-10">{children}</div>
  );
}
