import React, { useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../Context/AuthContextProvider';
import LoginBtn from './LoginBtn.jsx'

const NavbarBrand = () => {
  return <a href='/' className='navbar-brand'>Brand</a>
}

const NavbarSearch = () => {
  return (
    <form className='d-flex' role='search'>
      <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search'/>
      <button className="btn btn-outline-primary" type='submit'>Search</button>
    </form>
  )
}


const User = () => {

  const { currentUser, logout } = useAuth()


  useEffect(() => {

  },[])

  function handleLogOut() {
    logout()
    // document.location.reload()
  }

  if(!currentUser) return <LoginBtn/>


  // <button className='btn dropdown-toggler' id='userDropdownMenuIcon' type='button' data-bs-toggle='dropdown' data-bs-auto-close="outside" aria-expanded="false">
  //     <FaUserCircle/></button>

  return (
    <>
     <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#userSettingOffcanvas" aria-controls="userSettingOffcanvas">
       <FaUserCircle/></button>

      <div className='offcanvas offcanvas-start' tabIndex={"-1"} id="userSettingOffcanvas" aria-labelledby="offcanvasLabel">
        <div className="offcanvas-header">
          <h1 className="offcanvas-title" id='offcanvasLabel'>Setting</h1>
          <button className="btn-close" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <button className='btn' type='button' onClick={handleLogOut}>Log out</button>
        </div>
      </div>
    </>
  )
}

const Navbar = () => {
  return (
    <nav className='navbar bg-body-tertiary'>
      <div className="container-fluid">
        <div className="wrapper d-flex">
          <NavbarBrand/>
          <NavbarSearch/>
        </div>
        <div className="wrapper d-flex">
          <User/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
