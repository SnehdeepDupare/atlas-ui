import { cn } from "@/lib/utils";

interface ComponentWrapperProps {
  className?: string;
  children: React.ReactNode;
  overflow?: "hidden" | "auto" | "visible";
}
const ComponentWrapper = ({
  className,
  children,
  overflow,
}: ComponentWrapperProps) => {
  return (
    <div
      data-overflow={overflow}
      className={cn(
        "bg-background relative flex w-full items-center justify-center rounded-xl border p-0 data-[overflow=auto]:overflow-auto data-[overflow=hidden]:overflow-hidden data-[overflow=visible]:overflow-visible",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ComponentWrapper;
