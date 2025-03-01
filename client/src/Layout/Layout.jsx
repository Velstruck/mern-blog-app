import AppSidebar from '@/components/AppSidebar'
import { Footer } from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/ThemeProvider'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="blog-theme">
            <SidebarProvider>
                <Topbar />
                <AppSidebar />
                <main className='w-full'>
                    <div className='w-full min-h-[calc(100vh-50px)] py-28 px-10'>
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default Layout