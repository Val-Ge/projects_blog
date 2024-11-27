import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: "views",
      type: "number",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category"),
    }),
    // defineField({
    //   name: "image",
    //   type: "url",
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "Explanation",
      type: "markdown",
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',  
      options: {
        hotspot: true,  // Optional: allows image cropping/focusing
      },
    }),
  ],
});
