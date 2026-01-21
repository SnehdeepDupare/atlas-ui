import {
  NotchNav,
  NotchNavContent,
  NotchNavItem,
  NotchNavTrigger,
} from "@/registry/react/atlasui/notch-nav";

export const NotchNavDemo = () => {
  return (
    <div className="relative h-96 md:h-128">
      <NotchNav>
        <NotchNavTrigger />
        <NotchNavContent>
          <NotchNavItem href="#">Home</NotchNavItem>
          <NotchNavItem href="#">About</NotchNavItem>
          <NotchNavItem href="#">Products</NotchNavItem>
          <NotchNavItem href="#">Services</NotchNavItem>
          <NotchNavItem href="#">Contact</NotchNavItem>
        </NotchNavContent>
      </NotchNav>
    </div>
  );
};
