import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName'
import React, { useState } from 'react'
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
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'

const CategoryDetails = () => {
  const [refreshData, setRefreshData] = useState(false)

  const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'GET',
    credentials: 'include',
  }, [refreshData])

  const handleDelete = async (id) => {
    const response =await deleteData(`${getEnv('VITE_API_BASE_URL')}/category/delete/${id}`)

    if(response){
      setRefreshData(!refreshData)
      showToast('success', 'Category deleted successfully')
    }
    else{
      showToast('error', 'Failed to delete category')
    }
  }

  if (loading) return <Loading />


  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length > 0 ?
                categoryData.category.map(category =>
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className=" flex gap-3">
                      <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                        <Link to={RouteEditCategory(category._id)}>
                          <FaRegEdit />
                        </Link>
                      </Button>
                      <Button onClick={()=>handleDelete(category._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" size="icon">                       
                          <RiDeleteBin6Line/>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
                :
                <TableRow>
                  <TableCell colSpan="3">
                    No category found
                  </TableCell>
                </TableRow>

              }
            </TableBody>
          </Table>

        </CardContent>
      </Card>
    </div>
  )
}

export default CategoryDetails