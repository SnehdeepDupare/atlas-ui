import { cn } from "@/lib/utils";

interface ComponentWrapperProps {
  className?: string;
  children: React.ReactNode;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full rounded-xl bg-background p-0 border",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ComponentWrapper;
