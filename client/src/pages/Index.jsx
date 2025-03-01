import BlogCard from '@/components/BlogCard'
import BlogCardSkeleton from '@/components/BlogCardSkeleton'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

export const Index = () => {
  const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/blogs`, {
    method: 'GET',
    credentials: 'include',
  })

  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      {loading ? (
        // Show 6 skeleton cards while loading
        [...Array(6)].map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))
      ) : blogData && blogData.blog.length > 0 ? (
        blogData.blog.map(blog => <BlogCard key={blog._id} props={blog}/>)
      ) : (
        <div className="col-span-full text-center text-gray-500">No blog posts found</div>
      )}
    </div>
  )
}
