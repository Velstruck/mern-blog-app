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
import { RouteCategoryDetails } from '@/helpers/RouteName';

const AppSidebar = () => {
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
                                <Link to="">Home</Link>
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
                                <Link to="">Blogs</Link>
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
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <GoDot />
                                <Link to="">Category Item</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            
        </Sidebar>

    )
}

export default AppSidebar