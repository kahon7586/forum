import React, { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../Context/AuthContextProvider';
import LoginBtn from './LoginBtn.jsx'
import { useDataBase } from '../../Context/DataBaseContextProvider.jsx';

const NavbarBrand = () => {
  return <a href='/' className='navbar-brand'>Brand</a>
}

const NavbarSearch = () => {

  const [search, setSearch] = useState('')
  const searchInputref = useRef(null)

  useEffect(() => {
    console.log('searching: ' + search)
  })
  
  function handleOnChange() {
    console.log('changed')
    console.log(searchInputref.current.value)
    setSearch(searchInputref.current.value)
  }

  return (
    <form className='d-flex' role='search'>
      <input className='form-control me-2' onChange={handleOnChange} ref={searchInputref} type='text' placeholder='Search' aria-label='Search'/>
      {/* <button className="btn btn-outline-primary" type='button'>Search</button> */}
    </form>
  )
}


const User = () => {

  const { currentUser, logout } = useAuth()
  const { updateUserData } = useDataBase()


  useEffect(() => {

  },[])

  function handleLogOut() {
    logout()
    document.location.reload()
  }

  function handleTest() {
    updateUserData(currentUser)
  }

  if(!currentUser) return <LoginBtn/>



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
          <button className='btn' type='button' onClick={handleTest}>test update user</button>
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
