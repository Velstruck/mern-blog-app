import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import { RouteIndex, RouteSignIn, RouteSignUp } from './helpers/RouteName'
import { Index } from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
        </Route> 
        <Route element={<SignIn />} path={RouteSignIn} />
        <Route element={<SignUp />} path={RouteSignUp} />
      </Routes>
    </BrowserRouter>
  )
}

export default App