import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
    *[_type == "project" && defined(slug.current)]{
      _id,
      title,
      slug, 
      views,
      description,
      category,
      mainImage {
        asset-> {
          url
        }
      },
      explanation
    }
  `);
  