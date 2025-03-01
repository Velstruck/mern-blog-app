import React, { useState } from 'react'
import logo from '@/assets/images/logo-white.png'
import { Button } from './ui/button'
import { Link, Navigate, Route, useNavigate } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from '@/assets/images/user-icon.png';
import { FiUser } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { IoSearch } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useSidebar } from './ui/sidebar';
import { ThemeToggle } from './ThemeToggle';

const Topbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const {toggleSidebar} = useSidebar()

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json()
      if (!response.ok) {
        //toastify
        return showToast('error', data.message)
      }
      dispatch(removeUser())
      navigate(RouteIndex)
      showToast('success', data.message)
    }
    catch (err) {
      showToast('error', err.message)
    }
  }

  const toggleSearch = ()=>{
    setShowSearch(!showSearch)
  }
  return (
    <>
      <div className='h-[70px] fixed top-0 w-full z-50 px-10 flex items-center justify-between bg-background border-b border-border'>
        <div className='flex items-center gap-5'>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className='md:hidden block'>
            <IoMdMenu className='text-xl text-foreground' />
          </Button>
          <div className='w-24'>
            <Link to={RouteIndex}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
        </div>
        <div className='w-[500px]'>
          <div className={`md:relative md:block absolute bg-background left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
            <SearchBox />
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-2'>
            <ThemeToggle />
            {!showSearch && <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="md:hidden">
              <IoSearch className='text-xl text-foreground' />
            </Button>}
          </div>
          {!user.isLoggedIn ?
            <Button className='rounded-full' asChild>
              <Link to={RouteSignIn}>
                <FiLogIn />
                Sign In
              </Link>
            </Button>
            :
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.user.avatar || usericon} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{user.user.name}</p>
                  <p className='text-sm text-gray-500'>{user.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to={RouteProfile}>
                    <FiUser />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to={RouteBlogAdd}>
                    <FaPlus />
                    Create Post
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    < FiLogOut color='red' />
                    Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </div>
      </div>
    </>
  )
}

export default Topbar