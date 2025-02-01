import React from 'react'
import logo from '@/assets/images/logo-white.png'
import { Button } from './ui/button'
import { Link, Navigate, Route, useNavigate } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";
import SearchBox from './SearchBox';
import { RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
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



const Topbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-2.5 border-b'>
      <div>
        <img src={logo} />
      </div>
      <div className='w-[500px]'>
        <SearchBox />
      </div>
      <div>
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
                <Link to="">
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
  )
}

export default Topbar