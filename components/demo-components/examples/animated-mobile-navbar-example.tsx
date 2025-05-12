import {
  AnimatedMobileNavbar,
  AnimatedMobileNavbarContent,
  AnimatedMobileNavbarLink,
  AnimatedMobileNavbarTrigger,
} from "@/components/atlas_ui/(react)/animated-mobile-navbar";
import { Button } from "@/components/ui/button";

const SIDES = ["left", "top", "right"] as const;

type Side = (typeof SIDES)[number];

export const AnimatedMobileNavbarExample = () => {
  return (
    <div className="flex gap-2">
      {SIDES.map((side) => (
        <AnimatedMobileNavbar>
          <AnimatedMobileNavbarTrigger>
            <Button variant="outline">{side}</Button>
          </AnimatedMobileNavbarTrigger>
          <AnimatedMobileNavbarContent side={side}>
            <AnimatedMobileNavbarLink label="Home" href="#" />
            <AnimatedMobileNavbarLink label="About" href="#" />
            <AnimatedMobileNavbarLink label="Services" href="#" />
            <AnimatedMobileNavbarLink label="Contact Us" href="#" />
            <AnimatedMobileNavbarLink label="Pricing" href="#" />
          </AnimatedMobileNavbarContent>
        </AnimatedMobileNavbar>
      ))}
    </div>
  );
};
