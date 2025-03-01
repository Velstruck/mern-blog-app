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
import usericon from '@/assets/images/user-icon.png'
import moment from 'moment'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog'
import TableSkeleton from '@/components/TableSkeleton'

const Users = () => {
  const [refreshData, setRefreshData] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-all-user`, {
    method: 'GET',
    credentials: 'include',
  }, [refreshData])

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`)

    if(response){
      setRefreshData(!refreshData)
      showToast('success', 'User deleted successfully')
    }
    else{
      showToast('error', 'Failed to delete User')
    }
    setDeleteDialogOpen(false)
  }

  const openDeleteDialog = (id) => {
    setSelectedUserId(id)
    setDeleteDialogOpen(true)
  }

  const columns = [
    { className: "w-[100px]", skeletonWidth: "w-[60px]" },
    { className: "w-[150px]", skeletonWidth: "w-[100px]" },
    { className: "w-[200px]", skeletonWidth: "w-[150px]" },
    { className: "w-[100px]", type: "image" },
    { className: "w-[100px] whitespace-nowrap", skeletonWidth: "w-[60px]" },
    { className: "w-[100px]", type: "actions" },
  ]

  return (
    <div>
      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => handleDelete(selectedUserId)}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
      <Card>
        <CardContent>
          {loading ? (
            <TableSkeleton columns={columns} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Role</TableHead>
                  <TableHead className="w-[150px]">Name</TableHead>
                  <TableHead className="w-[200px]">Email</TableHead>
                  <TableHead className="w-[100px]">Avatar</TableHead>
                  <TableHead className="w-[100px] whitespace-nowrap">Date</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data.user.length > 0 ?
                  data.user.map(user =>
                    <TableRow key={user._id}>
                      <TableCell className="whitespace-nowrap">{user.role}</TableCell>
                      <TableCell className="whitespace-nowrap">{user.name}</TableCell>
                      <TableCell className="truncate max-w-[200px]">{user.email}</TableCell>
                      <TableCell>
                          <img src={user.avatar || usericon } className='w-10' />
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{moment(user.createdAt).format('DD-MM-YY')}</TableCell>
                      <TableCell className="flex gap-3">
                        <Button onClick={() => openDeleteDialog(user._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" size="icon">                       
                            <RiDeleteBin6Line/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                  :
                  <TableRow>
                    <TableCell colSpan="6" className="text-center">
                      No users found
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

export default Users