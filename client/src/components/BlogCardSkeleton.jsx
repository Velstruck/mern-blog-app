import React from 'react'
import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'

const BlogCardSkeleton = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className='flex items-center justify-between mb-4 pt-4'>
          <div className='flex items-center justify-between gap-2'>
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>

        <div className='w-full h-[250px] mb-4'>
          <Skeleton className="w-full h-full rounded" />
        </div>
        
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export default BlogCardSkeleton
