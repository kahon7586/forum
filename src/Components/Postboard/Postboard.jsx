import React, { createContext, useEffect, useState, } from 'react'
import './Postboard.css'
import Tab from '../Tab/Tab'
import { usePostboard } from '../../Context/PostboardContextProvider'
import Card from '../Card/Card'


const PageSelector = ( {currentPage, setcurrentPage, finalPage} ) => {

  const PrevPageButton = () => {
    return <button className="btn btn-outline-secondary" id="prevPageBtn" onClick={handleClickOnPrev}>Prev</button>
  }

  const NextPageButton = () => {
    return <button className="btn btn-outline-secondary" id="nextPageBtn"  onClick={handleClickOnNext}>Next</button>

  }

  const PageButtons = () => {

    const PageButton = ({ pageNumber }) => {

      if(currentPage + pageNumber < 1) return null 
      if(currentPage + pageNumber > finalPage) return null 
      
      const handleClickPage = () => {
        setcurrentPage((prev) => prev + pageNumber)
      }

      return <button className="btn btn-outline-secondary mx-1" onClick={handleClickPage}>{currentPage + pageNumber}</button>
    }

    return (
      <div>
        <PageButton pageNumber={-2}/>
        <PageButton pageNumber={-1}/>
        <button className="btn btn-secondary mx-1">{currentPage}</button>
        <PageButton pageNumber={+1}/>
        <PageButton pageNumber={+2}/>
      </div>
    )
  }

  function handleClickOnPrev() {
    setcurrentPage((prev) => prev - 1)
  }

  function handleClickOnNext() {
    setcurrentPage((prev) => prev + 1)
  }

  
  useEffect(() => {

    const isFirstPage = (currentPage === 1 ? true : false)
    const isFinalPage = (currentPage === finalPage ? true : false)
    if(isFirstPage) document.querySelectorAll("#prevPageBtn").forEach((node)=> node.disabled = true)
    if(isFinalPage) document.querySelectorAll("#nextPageBtn").forEach((node)=> node.disabled = true)
  })

  return (
    <div className="container-lg maxw-960 d-flex justify-content-between px-0 my-4">

      <PrevPageButton/>
      <PageButtons/>
      <NextPageButton/>

    </div>

  )
}


export const PostboardContext = createContext({})

const Postboard = () => {

  const { currentPage, setCurrentPage, finalPage, postData } = usePostboard()

  const [postList, setPostList] = useState(null)

  useEffect(() => {

    if(postData === null) return

    const postNodes = postData.map(({category, title, content, postTime, userInfo, id}, index) => {
      return <Card info={ { category, title, content, postTime, userInfo, id } } key={`${category}-${title}`}/>
    })
    setPostList(postNodes)
  }, [postData])

  return (
    <div className='container-lg maxw-960'>
        <PageSelector currentPage={currentPage} setcurrentPage={setCurrentPage} finalPage={finalPage}/>
        <Tab/>
        {postList}
        <PageSelector currentPage={currentPage} setcurrentPage={setCurrentPage} finalPage={finalPage}/>
      </div>

  )
}

export default Postboard
