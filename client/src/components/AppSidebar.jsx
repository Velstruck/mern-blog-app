import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/images/logo-white.png'
import { HiOutlineHome } from "react-icons/hi2";
import { TbCategory2 } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GrBlog } from "react-icons/gr";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import { useSelector } from 'react-redux';
import { useIsMobile } from '@/hooks/use-mobile';

const AppSidebar = () => {
    const user = useSelector(state => state.user)
    const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'GET',
        credentials: 'include',
    })
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { setOpenMobile } = useSidebar();

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <Sidebar>
            <SidebarHeader className="bg-background border-r border-border">
                <img src={logo} className='w-24' alt="Logo" />
            </SidebarHeader>
            <SidebarContent className="bg-background border-r border-border">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton 
                                className='mt-4'
                                onClick={() => handleNavigation(RouteIndex)}
                            >
                                <HiOutlineHome className="dark:text-foreground" />
                                <span className="dark:text-foreground">Home</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {user && user.isLoggedIn && (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => handleNavigation(RouteBlog)}
                                    >
                                        <GrBlog className="dark:text-foreground" />
                                        <span className="dark:text-foreground">Blogs</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => handleNavigation(RouteCommentDetails)}
                                    >
                                        <FaRegComment className="dark:text-foreground" />
                                        <span className="dark:text-foreground">Comments</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )}

                        {user && user.isLoggedIn && user.user.role === 'admin' && (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => handleNavigation(RouteCategoryDetails)}
                                    >
                                        <TbCategory2 className="dark:text-foreground" />
                                        <span className="dark:text-foreground">Categories</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => handleNavigation(RouteUser)}
                                    >
                                        <FiUsers className="dark:text-foreground" />
                                        <span className="dark:text-foreground">Users</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )}
                    </SidebarMenu>
                </SidebarGroup>

                {/* Categories list */}
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <span className="dark:text-foreground">Categories</span>
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0 ?
                            categoryData.category.map((category) => (
                                <SidebarMenuItem key={category._id}>
                                    <SidebarMenuButton
                                        onClick={() => handleNavigation(RouteBlogByCategory(category.slug))}
                                    >
                                        <GoDot className="dark:text-foreground" />
                                        <span className="dark:text-foreground">{category.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )) : null}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar