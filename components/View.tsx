// import React from 'react'
// import Ping from '@/components/Ping'
// import { client } from '@/sanity/lib/client'
// import { PROJECT_VIEWS_QUERY } from '@/sanity/lib/queries'
// import { writeClient } from '@/sanity/lib/write-client';
// import { unstable_after as after } from 'next/server';

// export default async function View({ id }: { id: string }) {
//     const { views: totalViews } = await client
//     .withConfig({ useCdn: false })
//     .fetch(PROJECT_VIEWS_QUERY, { id });

//   after(async () => await writeClient
//     .patch(id)
//     .set({ views: totalViews + 1 })
//     .commit());

//   return (
//     <div className='view-container'>
//         <div className='absolute -top-2 -right-2'>
//             <Ping />
//         </div>

//         <p className='view-text'> 
//             <span className='font-black'>views: {totalViews}</span>
//         </p>
//     </div>
//   )
// }

import React from 'react';
import Ping from '@/components/Ping';
import { client } from '@/sanity/lib/client';
import { PROJECT_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import { unstable_after as after } from 'next/server';

type ProjectViewsResult = {
  views: number;
};

export default async function View({ id }: { id: string }) {
  const { views: totalViews = 0 } = await client
    .withConfig({ useCdn: false })
    .fetch<ProjectViewsResult>(PROJECT_VIEWS_QUERY, { id });

  after(async () => {
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>

      <p className='view-text'>
        <span className='font-black'>views: {totalViews}</span>
      </p>
    </div>
  );
}
