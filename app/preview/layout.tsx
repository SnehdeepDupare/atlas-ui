export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 md:px-10">{children}</div>
  );
}
