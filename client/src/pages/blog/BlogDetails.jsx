import React from 'react'
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
import { RouteBlogAdd } from '@/helpers/RouteName'
const BlogDetails = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Post</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {categoryData && categoryData.category.length > 0 ?
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

              } */}
            </TableBody>
          </Table>

        </CardContent>
      </Card>
    </div>
  )
}

export default BlogDetails