import React from 'react';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Project } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/sanityImageUrl'

export type ProjectCardType = {
  _id: string;
  title: string | null | undefined;
  slug: { current: string } | null;
  views: number | null | undefined;
  description: string | null | undefined;
  category: string | null | undefined;
  mainImage: { asset: { url: string | null } | null } | null | undefined;
  explanation: string | null | undefined;
};

export default function ProjectCard({ post }: { post: ProjectCardType }) {
  const { views, title, category, _id, mainImage, description} = post; // Use 'post' for the destructured data
  
  return (
    <li className='project-card group'>
      <div className='flex gap-1.5'>
        <EyeIcon className="size-6 text-blue-900" />
        <span className='text-16-medium'>{views}</span>
      </div>

      <div className="flex-between mt-5 gap-5">
        <Link href={`/project/${_id}`}>
          <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
        </Link>
      </div>

      <Link href={`/project/${_id}`}>
        <p className='project-card_desc'>
          {description}
        </p>
        
        {/* Check if mainImage exists and render it */}
        {mainImage?.asset && (  // Use 'mainImage' from 'post' instead of 'project'
          <Image
            // src={mainImage.asset.url}  // Use the correct 'mainImage'
            src={urlFor(mainImage).url()}  // Generate the image URL dynamically
            alt={title ?? 'Project image'}  // Fallback for undefined title
            width={500}   // Set the desired width
            height={300}  // Set the desired height
            layout="responsive"  // Or any other layout options
          />
        )}
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/query=${category?.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>
        
        <Button className="startup-card_btn" asChild>
          <Link href={`/project/${_id}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  );
}
