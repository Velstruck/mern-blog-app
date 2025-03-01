import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import moment from 'moment'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog'
import TableSkeleton from '@/components/TableSkeleton'

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBlogId, setSelectedBlogId] = useState(null)

  const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`, {
    method: 'GET',
    credentials: 'include',
  }, [refreshData])

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`)

    if(response){
      setRefreshData(!refreshData)
      showToast('success', 'Blog deleted successfully')
    }
    else{
      showToast('error', 'Failed to delete Blog')
    }
    setDeleteDialogOpen(false)
  }

  const openDeleteDialog = (id) => {
    setSelectedBlogId(id)
    setDeleteDialogOpen(true)
  }

  const columns = [
    { className: "w-[120px]", skeletonWidth: "w-[80px]" },
    { className: "w-[120px]", skeletonWidth: "w-[80px]" },
    { className: "w-[200px]", skeletonWidth: "w-[150px]" },
    { className: "w-[150px]", skeletonWidth: "w-[100px]" },
    { className: "w-[100px] whitespace-nowrap", skeletonWidth: "w-[60px]" },
    { className: "w-[100px]", type: "actions", doubleAction: true },
  ]

  return (
    <div>
      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => handleDelete(selectedBlogId)}
        title="Delete Blog Post"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
      />
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Post</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton columns={columns} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Author</TableHead>
                  <TableHead className="w-[120px]">Category</TableHead>
                  <TableHead className="w-[200px]">Title</TableHead>
                  <TableHead className="w-[150px]">Slug</TableHead>
                  <TableHead className="w-[100px] whitespace-nowrap">Date</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogData && blogData.blog.length > 0 ?
                  blogData.blog.map(blog =>
                    <TableRow key={blog._id}>
                      <TableCell className="whitespace-nowrap">{blog?.author?.name}</TableCell>
                      <TableCell className="whitespace-nowrap">{blog?.category?.name}</TableCell>
                      <TableCell className="truncate max-w-[200px]">{blog?.title}</TableCell>
                      <TableCell className="truncate max-w-[150px]">{blog?.slug}</TableCell>
                      <TableCell className="whitespace-nowrap">{moment(blog?.createdAt).format('DD-MM-YY')}</TableCell>
                      <TableCell className="flex gap-3">
                        <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                          <Link to={RouteBlogEdit(blog._id)}>
                            <FaRegEdit />
                          </Link>
                        </Button>
                        <Button onClick={() => openDeleteDialog(blog._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" size="icon">                       
                            <RiDeleteBin6Line/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                  :
                  <TableRow>
                    <TableCell colSpan="6" className="text-center">
                      No blog posts found
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogDetails