import {
  NotchNav,
  NotchNavContent,
  NotchNavItem,
  NotchNavTrigger,
} from "@/registry/react/atlasui/notch-nav";

export const NotchNavDemo = () => {
  return (
    <div className="relative h-[50vh]">
      <NotchNav>
        <NotchNavTrigger />
        <NotchNavContent>
          <NotchNavItem href="/">Home</NotchNavItem>
          <NotchNavItem href="/about">About</NotchNavItem>
          <NotchNavItem href="/products">Products</NotchNavItem>
          <NotchNavItem href="/services">Services</NotchNavItem>
          <NotchNavItem href="/contact">Contact</NotchNavItem>
        </NotchNavContent>
      </NotchNav>
    </div>
  );
};
