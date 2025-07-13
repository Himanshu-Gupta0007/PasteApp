import React from 'react'
import { Link, Outlet } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='navlink'>
       
       
        <Link  to='/home'> Home</Link>
        <Link  to='/paste'> paste</Link>

        <Outlet/>
    </div>
  )
}

export default Navbar