import React from "react";
import Image from "next/Image";
import { AspectRatio } from "@/components/ui/aspect-ratio";


export const AboutUs = () => {
  
  return(
    <>
    <div className="w-full">
      <AspectRatio ratio={16 / 9}>
        <Image src="..." alt="Image" className="rounded-md object-cover" />
      </AspectRatio>
    </div>
    </>
  )
}