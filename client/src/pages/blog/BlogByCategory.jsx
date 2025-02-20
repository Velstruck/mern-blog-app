import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'
import { BiCategoryAlt } from "react-icons/bi";


const BlogByCategory = () => {
    const { category } = useParams()

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog-by-category/${category}`, {
        method: 'GET',
        credentials: 'include',
    }, [category])

    if (loading) return <Loading />
    return (
        <>
            <div className='text-2xl font-bold mb-5 flex items-center gap-2 text-violet-500 border-b-2 pb-3'>
                <BiCategoryAlt />
                <h4 className='flex gap-1'>
                    {blogData && blogData.categoryData?.name}
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

export default BlogByCategory