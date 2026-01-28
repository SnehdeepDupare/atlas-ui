import Link from "next/link";

import { Button } from "../ui/button";

export const ProjectGalleryPreview = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-2 text-center text-xl font-bold">
        Trust me, I look better on FullScreen :)
      </h2>

      <Link href="/preview/project-gallery" target="_blank">
        <Button>Show Preview</Button>
      </Link>
    </div>
  );
};
