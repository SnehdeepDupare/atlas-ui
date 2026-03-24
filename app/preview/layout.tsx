import { PreviewNavbar } from "@/components/preview-navbar";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full">
      {children}

      <PreviewNavbar />
    </div>
  );
}
