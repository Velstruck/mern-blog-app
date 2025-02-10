import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import slugify from 'slugify'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFetch } from '@/hooks/useFetch'
import Dropzone from 'react-dropzone'
import { useState } from 'react'


const AddBlog = () => {
  const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'GET',
    credentials: 'include',
  }, [])

  const [filePreview, setFilePreview] = useState()
  const [file, setFile] = useState()

  const formSchema = z.object({
    category: z.string().min(3, 'Category must be at least 3 characters long'),
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    slug: z.string().min(3, 'Slug must be at least 3 characters long'),
    blogContent: z.string().min(5, 'blogContent must be at least 5 characters long'),

  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      title: '',
      slug: '',
      blogContent: '',
    },
  })

  //converting to slug
  const blogTitle = form.watch('title')
  useEffect(() => {
    if (blogTitle) {

      const slug = slugify(blogTitle, { lower: true })
      form.setValue('slug', slug)
    }

  }, [blogTitle])

  async function onSubmit(values) {
    // try {
    //   const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values)
    //   })
    //   const data = await response.json()
    //   if (!response.ok) {
    //     //toastify
    //     return showToast('error', data.message)
    //   }
    //   form.reset();
    //   showToast('success', data.message)
    // }
    // catch (err) {
    //   showToast('error', err.message)
    // }

  }
  const handleFileSelection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setFilePreview(preview)
}

  return (

    <div>
      <Card className="pt-5">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData && categoryData.category.length > 0 && categoryData.category.map((category) => (
                              <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-3'>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-3'>
                <span className='block mb-2'>Featured Image</span>
                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                        <div className='flex justify-center items-center w-36 h-28 border-2 border-dashed rounded hover:border-violet-500 hover:bg-gray-200 cursor-pointer'>
                          <img src={filePreview} alt="preview" />
                        </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className='mt-5'>
                <Button type="submit" className="w-full">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  )
}

export default AddBlog