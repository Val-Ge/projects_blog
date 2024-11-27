import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
    *[_type == "project" && defined(slug.current) && !defined($search) || title match $search || category match $search ]{
      _id,
      title,
      slug, 
      views,
      description,
      explanation,
      category,
      mainImage {
        asset-> {
          url
        }
      }
    }
  `);

  export const PROJECTS_BY_ID_QUERY = defineQuery(`
    *[_type == "project" && _id == $id][0]{
      _id,
      title,
      slug, 
      views,
      description,
      explanation,
      category,
      mainImage {
        asset-> {
          url
        }
      }
    }
  `);

  export const PROJECT_VIEWS_QUERY = defineQuery(`
    *[_type == "project" && _id == $id][0]{
      _id, 
      views,
    }
  `);
  