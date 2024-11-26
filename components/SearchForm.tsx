import React from 'react'
import Form from 'next/form'
import { SearchFormReset } from '@/components/SearchFormReset'
import {Search} from 'lucide-react'

export default function SearchForm({ query }: { query?: string }) {
  return (
    <Form action="/" scroll={false} className='search-form !max-w-lg'>
        <input 
            name="query"
            defaultValue={query}
            className='="search-input max-w-72'
            placeholder="Search Projects"
        />
        <div className='flex gap-2'>
            {query && <SearchFormReset />}
            <button type="submit" className='search-btn text-white'>
                <Search className='size-5'/>
            </button>
        </div>
    </Form>
  )
}
