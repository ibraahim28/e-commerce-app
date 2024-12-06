import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = ({isCartOpen, setIsCartOpen}) => {

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }
  
  return (
    <>
        <Navbar toggleCart={toggleCart} />
        <Outlet />
    </>
  )
}

export default Layout
