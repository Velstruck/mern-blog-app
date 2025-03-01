import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/user-icon.png';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'

const BlogCard = ({ props }) => {

    return (
        <Card className="w-full">
            <Link to={RouteBlogDetails(props.category.slug, props.slug)} className="block">
                <CardContent>
                    <div className='flex items-center justify-between mb-4 pt-4'>
                        <div className='flex items-center justify-between gap-2'>
                            <Avatar>
                                <AvatarImage src={props.author.avatar || usericon} />
                            </Avatar>
                            <span>{props.author.name}</span>
                        </div>
                        {props.author.role === 'admin' &&
                            <Badge variant='outline' className='bg-violet-500'>Admin</Badge>
                        }
                    </div>

                    <div className='w-full h-[250px] mb-4'>
                        <img 
                            src={props.featuredImage} 
                            className='w-full h-full object-cover rounded'
                            alt={props.title}
                        />
                    </div>
                    <div>
                        <p className='flex items-center gap-2 mb-2'>
                            <FaRegCalendarAlt />
                            <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
                        </p>
                        <h2 className='text-2xl font-bold line-clamp-2'>{props.title}</h2>
                    </div>
                </CardContent>
            </Link>
        </Card>
    )
}

export default BlogCard