import {
  Project,
  ProjectGallery,
} from "@/components/atlas_ui/(react)/project-gallery";

export const ProjectGalleryDemo = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen w-full">
      <ProjectGallery>
        <Project
          title="Atlas UI"
          subtitle="Frontend"
          href="#"
          imgSrc="/assets/atlas-ui.png"
          color="#EFE8D3"
        />
        <Project
          title="Portfolio"
          subtitle="Design & Development"
          href="#"
          imgSrc="/assets/portfolio.png"
          color="#706D63"
        />
        <Project
          title="Tokyo Art"
          subtitle="Photography"
          href="#"
          imgSrc="https://images.unsplash.com/photo-1540652980807-db4655e8fa60?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          color="#FAFBFC"
        />
        <Project
          title="Milky Way"
          subtitle="Photography"
          href="#"
          imgSrc="https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          color="#404040"
        />
      </ProjectGallery>
    </div>
  );
};
