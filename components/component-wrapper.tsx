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
        "relative flex items-center justify-center w-full rounded-xl bg-background p-0 border data-[overflow=hidden]:overflow-hidden data-[overflow=auto]:overflow-auto data-[overflow=visible]:overflow-visible",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ComponentWrapper;
