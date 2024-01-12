import React, { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../Context/AuthContextProvider';
import LoginBtn from './LoginBtn.jsx'
import { useDataBase } from '../../Context/DataBaseContextProvider.jsx';
import { usePostboard } from '../../Context/PostboardContextProvider.jsx';

const NavbarBrand = () => {
  return <a href='/' className='navbar-brand'>Brand</a>
}

const NavbarSearch = () => {

  // const [search, setSearch] = useState('')
  const searchInputref = useRef(null)

  const allPostDataRef = useRef(null)

  const { getAllPostData } = useDataBase()
  const { setPostData } = usePostboard()

  useEffect(() => {

    async function searchOnClick() {
      try{
        console.log('fetching all data...')
        const allPostDataList = await getAllPostData()
        allPostDataRef.current = allPostDataList
        console.log('fetching all data done, dataList: ')
        console.log(allPostDataRef.current)
      }catch(error){
        console.log('error occur when fetching all data, error code: ' + error.code)
      }
    }

    searchInputref.current.addEventListener('click', searchOnClick, {once: true});


    function cleanUp() {
      searchInputref.current.removeEventListener('click', searchOnClick, {once: true});
    }

    return cleanUp

  },[getAllPostData])

  useEffect(() => {

  })
  
  function handleOnChange() {
    const searchParam = searchInputref.current.value
    console.log('searchParam: ' + searchParam)

    const allData = allPostDataRef.current

    const SEARCH_TARGET = ["title", "content", "userInfo"]

    function checkSearchParamIncluded( post ) {
      const isSearchParamInclued = SEARCH_TARGET.some(target => {
        console.log(target)
        if(target === "userInfo"){
          if( post.userInfo.email.includes(searchParam) ) return true
        }else{
          if( post[target].includes(searchParam) ) return true
        }
        return false
      })

      return isSearchParamInclued
    }

    function getfilterDataList( data ) {

      const result = []

      data.forEach((post, index) => {
        const isSearchParamInclued = checkSearchParamIncluded(post)
        if(isSearchParamInclued){ result.push(post) }
      })
      return result
    }

    const filterDataList = getfilterDataList(allData)
    console.log(filterDataList)
    setPostData(filterDataList)


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
