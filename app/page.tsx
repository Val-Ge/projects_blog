import SearchForm from "@/components/SearchForm";
import ProjectCard from "@/components/ProjectCard"
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";


export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(PROJECTS_QUERY )


  return (
    <>
    <section className="blue_container">
        <h1 className="heading">Check Out my Projects!</h1>
        <p className="sub-heading !max-w-3xl">Click on a project to find out how it was created, the bumps on the road, the stack used & more....</p>

        <SearchForm query={query}/>
    </section>

    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : 'All Projects'}
      </p>

      <ul className='mt-7 card_grid'>
        {posts?.length > 0 ? (
          posts.map((post: ProjectCardType, index: number) => (
            <ProjectCard key={post?._id} post={post}/>
          ))
        ) : (
          <p className="no-results">No Projects found</p>
        )}
      </ul>
    </section>
    
    </>
  );
}
