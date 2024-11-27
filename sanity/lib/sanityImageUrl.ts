import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'i2juqazl',  // Replace with your Sanity project ID
  dataset: 'production',         // Replace with your dataset (e.g., 'production')
  useCdn: true,
  apiVersion: '2024-05-27',       // Use today's date or your preferred version
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
