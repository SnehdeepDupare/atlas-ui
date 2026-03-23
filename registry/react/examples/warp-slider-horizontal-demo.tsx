import { WarpSlider } from "@/registry/react/atlasui/warp-slider";

const slides = [
  {
    name: "Orion",
    img: "https://images.unsplash.com/photo-1773311583232-0a5765cf08ac?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Aries",
    img: "https://images.unsplash.com/photo-1773530615360-eb180ed88622?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Taurus",
    img: "https://images.unsplash.com/photo-1773011389556-2bf0474cefd9?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gemini",
    img: "https://images.unsplash.com/photo-1771030668418-390b3edf33e4?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cancer",
    img: "https://images.unsplash.com/photo-1772289935218-78954128824a?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Leo",
    img: "https://images.unsplash.com/photo-1770988966858-da0a4bde2f0b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Virgo",
    img: "https://images.unsplash.com/photo-1771308457683-eef03842c1ed?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Libra",
    img: "https://images.unsplash.com/photo-1770341989953-f3efb336f7eb?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Scorpio",
    img: "https://images.unsplash.com/photo-1595660981167-fe72e31f6a40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sagittarius",
    img: "https://images.unsplash.com/photo-1709570597799-7d94d430a2bc?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const WarpSliderHorizontalDemo = () => {
  return <WarpSlider slides={slides} config={{ orientation: "horizontal" }} />;
};
