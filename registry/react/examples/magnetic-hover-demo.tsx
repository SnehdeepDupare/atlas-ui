import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MagneticHover } from "@/registry/react/atlasui/magnetic-hover";

export const MagneticHoverDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <MagneticHover>
        <Button>Hover Me</Button>
      </MagneticHover>

      <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-2 text-sm">
        <span>The cursor has</span>

        <MagneticHover strength={0.5}>
          <Link
            href="#"
            className="text-foreground font-medium underline underline-offset-4"
          >
            magnetic powers
          </Link>
        </MagneticHover>

        <span>now.</span>
      </div>
    </div>
  );
};
