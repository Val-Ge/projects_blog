import { client } from '@/sanity/lib/client';
import { PROJECTS_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from "markdown-it";
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit()

export default async function page({ params }: { params: Promise<{ id: string }>}) {
    const id = (await params).id;
    console.log('Fetching ID:', id);

    const post = await client.fetch(PROJECTS_BY_ID_QUERY, { id });
    console.log('Fetched Post:', post);

    if(!post) return notFound();

    const parsedContent = post.explanation
        ? md.render(post?.explanation)
        : "<p>No additional project details available</p>"

  return (
    <>
    <section className='blue_container !min-h-[230px]'>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
    </section>

    <section className='section_container'>
    <img 
        src={post.mainImage?.asset?.url || ""}  // Safely access the URL
        alt="thumbnail"
        className='w-1/2 h-1/2 rounded-xl'
    />

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
            <div className='flex-between gap-5'>
                <p className="category-tag">{post.category}</p>
            </div>
            <h3 className='text-30-bold'>Project Details</h3>
            {parsedContent ? (
                <article 
                    className='prose max-w-4xl break-all'
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
            ): (
                <p className='no-result'>No Details Found</p>
            )}
        </div>

        <hr className='divider'/>

        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
            <View id={id} />
        </Suspense>

    </section> 
    </>
  )
}
