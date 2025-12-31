import {
  AnimatedMobileNavbar,
  AnimatedMobileNavbarContent,
  AnimatedMobileNavbarLink,
  AnimatedMobileNavbarTrigger,
} from "@/registry/react/atlasui/animated-mobile-navbar";

export const AnimatedMobileNavbarDemo = () => {
  return (
    <AnimatedMobileNavbar>
      <AnimatedMobileNavbarTrigger>Open</AnimatedMobileNavbarTrigger>
      <AnimatedMobileNavbarContent>
        <AnimatedMobileNavbarLink label="Home" href="#" />
        <AnimatedMobileNavbarLink label="About" href="#" />
        <AnimatedMobileNavbarLink label="Services" href="#" />
        <AnimatedMobileNavbarLink label="Contact Us" href="#" />
        <AnimatedMobileNavbarLink label="Pricing" href="#" />
      </AnimatedMobileNavbarContent>
    </AnimatedMobileNavbar>
  );
};
