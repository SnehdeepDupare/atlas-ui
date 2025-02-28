import {
  Project,
  ProjectGallery,
} from "@/components/atlas_ui/(react)/project-gallery";

export const ProjectGalleryDemo = () => {
  return (
    <ProjectGallery>
      <Project
        title="Earth"
        subtitle="Frontend"
        href="#"
        imgSrc="/earth.jpg"
        color="#FAFBFC"
      />
      <Project
        title="Black Hole"
        subtitle="Frontend"
        href="#"
        imgSrc="/black-hole.jpg"
        color="#404040"
      />
      <Project
        title="Red Moon"
        subtitle="Frontend"
        href="#"
        imgSrc="/red-moon.jpg"
        color="#EFE8D3"
      />
      <Project
        title="Space X"
        subtitle="Frontend"
        href="#"
        imgSrc="/space-x.jpg"
        color="#706D63"
      />
    </ProjectGallery>
  );
};
