import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'



const SignIn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

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

    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (!response.ok) {
                //toastify
                return showToast('error', data.message)
            }
            dispatch(setUser(data.user))
            navigate(RouteIndex)
            showToast('success', data.message)
        }
        catch (err) {
            showToast('error', err.message)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Card className='w-[400px] p-5'>
                <h1 className='text-2xl font-bold mb-5 text-center' >Sign into your Account</h1>
                <div>
                    <GoogleLogin />
                    <div className='border-2 my-5 flex justify-center items-center border-gray-400 relative'>
                        <span className='absolute bg-white text-sm p-1'>
                            or
                        </span>
                    </div>
                </div>
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
                                            <Input type="password" placeholder="Enter your secret " {...field} />
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

export default SignIn