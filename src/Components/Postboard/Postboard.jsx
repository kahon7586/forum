import React, { createContext,  useContext,  useEffect, useState } from 'react'
import './Postboard.css'
import Tab from '../Tab/Tab'
import Card from '../Card/Card'
import { DataBaseContext } from '../../Context/DataBaseContextProvider'


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
  const [cards, setCards] = useState(null)

  const { readArticle } = useContext(DataBaseContext)

  

  useEffect(()=> {

    async function loadArticle() {
      await readArticle( setCards )
    }

    loadArticle()
  }, [ readArticle ])
  
  const TEST_VARIABLE_FINAL_PAGE = 10;

  const finalPage = TEST_VARIABLE_FINAL_PAGE;

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
        {cards}
        <PageSelector currentPage={currentPage} setcurrentPage={setCurrentPage} finalPage={finalPage}/>
      </div>
    </PostboardContext.Provider>
  )
}

export default Postboard
