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
} from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo-white.png'
import { HiOutlineHome } from "react-icons/hi2";
import { TbCategory2 } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GrBlog } from "react-icons/gr";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteIndex } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';

const AppSidebar = () => {

     const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'GET',
        credentials: 'include',
      })


    return (
        <Sidebar>
            <SidebarHeader className="bg-white">
                <img src={logo} width={120} />
            </SidebarHeader>
            <SidebarContent className="bg-white">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <HiOutlineHome />
                                <Link to={RouteIndex}>Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <TbCategory2 />
                                <Link to={RouteCategoryDetails}>Categories</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>  
                                <GrBlog />                             
                                <Link to={RouteBlog}>Blogs</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>                               
                                <FaRegComment />
                                <Link to="">Comments</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>                               
                                <FiUsers />
                                <Link to="">Users</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

            {/* Categories list */}
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0 ?
                            categoryData.category.map(category =>
                                <SidebarMenuItem key={category._id}>
                                    <SidebarMenuButton>
                                        <GoDot />
                                        <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : null
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            
        </Sidebar>

    )
}

export default AppSidebar