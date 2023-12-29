import React, { createContext, useContext, useEffect, useState } from 'react'
import './Postboard.css'
import { DataBaseContext } from '../../Context/DataBaseContextProvider'
import Tab from '../Tab/Tab'

const Card = () => {
  return (
    <div className="card mb-2">
      <p className="card-header fs-6">category 1</p>
      <div className="card-body">
        <p className="card-title fs-4">title here</p>
        <p className="card-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, nihil.</p>
      </div>
    </div>
  )
}

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

  const handleClickOnPrev = () => {
    setcurrentPage((prev) => prev - 1)
  }

  const handleClickOnNext = () => {
    setcurrentPage((prev) => prev + 1)
  }

  
  useEffect(() => {
    const isFirstPage = (currentPage === 1 ? true : false)
    const isFinalPage = (currentPage === finalPage ? true : false)
    if(isFirstPage) document.querySelectorAll("#prevPageBtn").forEach((node)=> node.disabled = true)
    if(isFinalPage) document.querySelectorAll("#nextPageBtn").forEach((node)=> node.disabled = true)
  }, [currentPage, finalPage])

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

  const CATEGORIES = ["All", "Life", "Food"]

  const [currentPage, setCurrentPage] = useState(1)
  const [currentCategory, setCurrentCategory] = useState("All")
  
  const TEST_VARIABLE_FINAL_PAGE = 10;

  const finalPage = TEST_VARIABLE_FINAL_PAGE;


  const { writeArticle } = useContext(DataBaseContext) 

  const handleAdd = () => {
    writeArticle('life', 'test title', 'test content')
  }

  const ContextValue = {
    CATEGORIES,
    currentPage, setCurrentPage, 
    currentCategory, setCurrentCategory
  }

  return (
    <PostboardContext.Provider value={ContextValue}>
      <div className='container-lg maxw-960'>
        <PageSelector currentPage={currentPage} setcurrentPage={setCurrentPage} finalPage={finalPage}/>
        <Tab/>
        <Card/>
        <Card/>
        <PageSelector currentPage={currentPage} setcurrentPage={setCurrentPage} finalPage={finalPage}/>
      </div>
    </PostboardContext.Provider>
  )
}

export default Postboard
