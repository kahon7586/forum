import React, { useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { auth } from '../../Context/FirebaseAuth';
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

  const { currentUser } = useAuth()

  useEffect(() => {
    console.log('CurrentUser: ' + currentUser)
  },[])

  if(!currentUser) return <LoginBtn/>


  return (
  <div className='dropdown'>
    <button className='btn dropdown-toggler' id='userDropdownMenuIcon' type='button' data-bs-toggle='dropdown' aria-expanded="false">
      <FaUserCircle/></button>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdownMenuIcon">
      <li><a href="#item1" className="dropdown-item">Setting</a></li>
      <li><hr className="dropdown-divider" /></li>
      <li><a href="#item2" className="dropdown-item">log out</a></li>
    </ul>
  </div>
  )
}

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
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
