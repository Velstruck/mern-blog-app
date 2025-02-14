import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { useParams } from 'react-router-dom'
import { decode } from 'entities'
import Comments from '@/components/Comments'
import CommentList from '@/components/CommentList'
import moment from 'moment'
import CommentCount from '@/components/CommentCount'
import LikeCount from '@/components/LikeCount'

const SingleBlogDetails = () => {
  const { blog } = useParams()
  const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
    method: 'GET',
    credentials: 'include',
  })

  if (loading) return <Loading />
  return (
    <div className='flex justify-between gap-20'>
      {data && data.blog &&
        <>
          <div className='border rounded w-[70%] p-5'>
            <h1 className='text-2xl font-bold mb-5'>{data.blog.title}</h1>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center gap-5'>
                <Avatar>
                  <AvatarImage src={data.blog.author.avatar} />
                </Avatar>
                <div>
                  <p>{data.blog.author.name}</p>
                  <p className='text-gray-600'><span className='text-black'>Date:</span> {moment(data.blog.createdAt).format('dddd DD[th] MMMM YYYY')}</p>
                </div>
              </div>
              <div className='flex justify-between items-center gap-5'>
                <LikeCount props={{blogid: data.blog._id }}/>
                <CommentCount props={{ blogid: data.blog._id }} />
              </div>
            </div>
            <div className='my-5'>
              <img src={data.blog.featuredImage} className='rounded' />
            </div>
            <div dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) } || ''}>
            </div>
            <div className='border-t border-gray-200 mt-5 pt-5'>
              <Comments props={{ blogid: data.blog._id }} />
            </div>
          </div>
        </>
      }
      <div className='border rounded w-[30%]'>
      </div>
    </div>
  )
}

export default SingleBlogDetails