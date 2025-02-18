import BlogCard from '@/components/BlogCard'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchResult = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
        method: 'GET',
        credentials: 'include',
      })
    console.log(blogData);
    
    return (
        <>
            <div className='text-2xl font-bold mb-5 flex items-center gap-2 text-violet-500 border-b-2 pb-3'>
                <h4>
                    Search Result For: <span className='italic'>" {q} "</span>
                </h4>
            </div>
            <div className='grid grid-cols-3 gap-10'>
                {blogData && blogData.blog.length > 0
                    ?
                    blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
                    :
                    <div>Data not found..</div>
                }
            </div>
        </>
    )
}

export default SearchResult