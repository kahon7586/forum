import React, { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { auth } from '../../Context/FirebaseAuth';
import { useAuth } from '../../Context/AuthContextProvider';
// import './LoginSignUpModal.css'

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

const LoginBtn = () => {

  const [currentMode, setCurrentMode] = useState('login')

  const loginRadioRef = useRef(null)
  const loginRef = useRef(null)
  const signUpRadioRef = useRef(null)
  const signUpRef = useRef(null)

  const selectedStyle = ["border-bottom", "border-primary", "rounded-0"]

  useEffect(() => {
    
  })

  return (
    <div className="wrapper">
      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#LoginSignUpModal">Login</button>
      <div className="modal" tabIndex="-1" id="LoginSignUpModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-center">
            <input className="btn-check" type="radio" ref={loginRadioRef}  name="login-signUp" id="Login" autoComplete="off" defaultChecked/>
            <label className="btn" ref={loginRef} htmlFor="Login">Login</label>

            <input className="btn-check" type="radio" ref={signUpRadioRef}  name="login-signUp" id="SignUp" autoComplete="off"/>
            <label className="btn" ref={signUpRef} htmlFor="SignUp">Sign Up</label>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
      </div>
    </div>
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
