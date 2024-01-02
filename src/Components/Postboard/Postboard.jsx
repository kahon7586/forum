import React, { createContext,  useContext,  useEffect, useState } from 'react'
import './Postboard.css'
import Tab from '../Tab/Tab'
import { DataBaseContext } from '../../Context/DataBaseContextProvider'
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

  const CATEGORIES = ["Life", "Food", "Learn"]

  const [currentPage, setCurrentPage] = useState(1)
  const [finalPage, setFinalPage] = useState(1)
  const [currentCategory, setCurrentCategory] = useState("All")
  const [cards, setCards] = useState(null)
  
  const { buildQuery, fetchArticles, countDoc } = useContext(DataBaseContext)
  
  useEffect( () => {

    function setUp() {

      const currentRef = buildQuery(currentCategory, currentPage)
      const wholeRef = buildQuery(currentCategory)
      
      async function loadPosts() {
        
        const dataList = await fetchArticles(currentRef)
        const CardList = dataList.map(({category, title, content, postTime}, index) => {
          return <Card info={ { category, title, content, postTime } } key={`${category}-${title}`}/>
        })
        setCards(CardList)
      }
      
      async function setPageNumber() {
        
        const totalPostNumber = await countDoc(wholeRef)
        const finalPageNumber = Math.ceil(totalPostNumber/5)
        setFinalPage(finalPageNumber)
      }
      
      loadPosts()
      setPageNumber()
    }

    setUp()

  }, [currentCategory, currentPage, buildQuery, countDoc, fetchArticles])

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
