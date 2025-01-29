
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { RouteSignUp } from '@/helpers/RouteName'


const SignUp = () => {
    const formSchema = z.object({
            email: z.string().email(),
            password: z.string().min(8, 'Password must be at least 8 characters long')
        })
    
        const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
                password: "",
            },
        })
    
        function onSubmit(values) {
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            console.log(values)
        }
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Card className='w-[400px] p-5'>
                <h1 className='text-2xl font-bold mb-5 text-center' >Create your Account</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your secret " {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div mt-5>
                            <Button type="submit" className="w-full">Sign In</Button>
                            <div className='mt-5 text-sm flex justify-center gap-2'>
                                <p>Don't have an account?</p>
                                <Link to={RouteSignUp} className='text-blue-500 hover:underline'>Sign Up</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default SignUp