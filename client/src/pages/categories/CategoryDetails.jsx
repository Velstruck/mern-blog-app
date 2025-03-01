import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog'
import TableSkeleton from '@/components/TableSkeleton'

const CategoryDetails = () => {
  const [refreshData, setRefreshData] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'GET',
    credentials: 'include',
  }, [refreshData])

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/category/delete/${id}`)

    if(response){
      setRefreshData(!refreshData)
      showToast('success', 'Category deleted successfully')
    }
    else{
      showToast('error', 'Failed to delete category')
    }
    setDeleteDialogOpen(false)
  }

  const openDeleteDialog = (id) => {
    setSelectedCategoryId(id)
    setDeleteDialogOpen(true)
  }

  const columns = [
    { className: "w-[200px]", skeletonWidth: "w-[150px]" },
    { className: "w-[200px]", skeletonWidth: "w-[150px]" },
    { className: "w-[100px]", type: "actions", doubleAction: true },
  ]

  return (
    <div>
      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => handleDelete(selectedCategoryId)}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCategory}>Add Category</Link>
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
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead className="w-[200px]">Slug</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryData && categoryData.category.length > 0 ?
                  categoryData.category.map(category =>
                    <TableRow key={category._id}>
                      <TableCell className="whitespace-nowrap">{category.name}</TableCell>
                      <TableCell className="truncate max-w-[200px]">{category.slug}</TableCell>
                      <TableCell className="flex gap-3">
                        <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                          <Link to={RouteEditCategory(category._id)}>
                            <FaRegEdit />
                          </Link>
                        </Button>
                        <Button onClick={() => openDeleteDialog(category._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" size="icon">                       
                            <RiDeleteBin6Line/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                  :
                  <TableRow>
                    <TableCell colSpan="3" className="text-center">
                      No categories found
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

export default CategoryDetails