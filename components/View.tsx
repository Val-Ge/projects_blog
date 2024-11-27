import React from 'react'
import Ping from '@/components/Ping'
import { client } from '@/sanity/lib/client'
import { PROJECT_VIEWS_QUERY } from '@/sanity/lib/queries'

export default async function View({ id }: { id: string }) {
    const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(PROJECT_VIEWS_QUERY, { id })

  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>

        <p className='view-text'> 
            <span className='font-black'>views: {totalViews}</span>
        </p>
    </div>
  )
}
