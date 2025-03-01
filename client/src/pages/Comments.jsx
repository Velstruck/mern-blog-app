import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import { RiDeleteBin6Line } from "react-icons/ri"
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog'
import TableSkeleton from '@/components/TableSkeleton'

const Comments = () => {
  const [refreshData, setRefreshData] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCommentId, setSelectedCommentId] = useState(null)

  const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-all-comment`, {
    method: 'GET',
    credentials: 'include',
  }, [refreshData])

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`)

    if(response){
      setRefreshData(!refreshData)
      showToast('success', 'Comment deleted successfully')
    }
    else{
      showToast('error', 'Failed to delete comment')
    }
    setDeleteDialogOpen(false)
  }

  const openDeleteDialog = (id) => {
    setSelectedCommentId(id)
    setDeleteDialogOpen(true)
  }

  const columns = [
    { className: "w-[200px]", skeletonWidth: "w-[150px]" },
    { className: "w-[150px]", skeletonWidth: "w-[100px]" },
    { className: "w-[250px]", skeletonWidth: "w-[200px]" },
    { className: "w-[100px] whitespace-nowrap", skeletonWidth: "w-[60px]" },
    { className: "w-[100px]", type: "actions" },
  ]

  return (
    <div>
      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => handleDelete(selectedCommentId)}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
      />
      <Card>
        <CardContent>
          {loading ? (
            <TableSkeleton columns={columns} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Blog</TableHead>
                  <TableHead className="w-[150px]">Commented By</TableHead>
                  <TableHead className="w-[250px]">Comment</TableHead>
                  <TableHead className="w-[100px] whitespace-nowrap">Date</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data.comments.length > 0 ?
                  data.comments.map(comment =>
                    <TableRow key={comment._id}>
                      <TableCell className="truncate max-w-[200px]">{comment?.blogid?.title}</TableCell>
                      <TableCell className="whitespace-nowrap">{comment?.user?.name}</TableCell>
                      <TableCell className="truncate max-w-[250px]">{comment?.comment}</TableCell>
                      <TableCell className="whitespace-nowrap">{moment(comment?.createdAt).format('DD-MM-YY')}</TableCell>
                      <TableCell className="flex gap-3">
                        <Button onClick={() => openDeleteDialog(comment._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" size="icon">                       
                            <RiDeleteBin6Line/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                  :
                  <TableRow>
                    <TableCell colSpan="5" className="text-center">
                      No comments found
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

export default Comments