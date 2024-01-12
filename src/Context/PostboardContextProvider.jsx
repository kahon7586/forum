import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDataBase } from './DataBaseContextProvider'

export const PostboardContext = createContext({})

export function usePostboard() {
  return useContext(PostboardContext)
}

const PostboardContextProvider = ({ children }) => {

  const CATEGORIES = ["Life", "Food", "Learn"]

  const [currentPage, setCurrentPage] = useState(1)
  const [finalPage, setFinalPage] = useState(1)
  const [currentCategory, setCurrentCategory] = useState("All")
  const [postData, setPostData] = useState(null)
  
  const { buildQuery, getShownPost, countDoc } = useDataBase()
  
  useEffect( () => {

    function setUp() {

      const currentRef = buildQuery(currentCategory, currentPage)
      const wholeRef = buildQuery(currentCategory)
      
      async function loadPosts() {
        
        const dataList = await getShownPost(currentRef)
        // const CardList = dataList.map(({category, title, content, postTime, userInfo, id}, index) => {
        //   return <Card info={ { category, title, content, postTime, userInfo, id } } key={`${category}-${title}`}/>
        // })
        setPostData(dataList)
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

  }, [currentCategory, currentPage, buildQuery, countDoc, getShownPost])

  const ContextValue = {
    CATEGORIES, finalPage,
    currentPage, setCurrentPage, 
    currentCategory, setCurrentCategory,
    postData, setPostData
  }


  return (
    <PostboardContext.Provider value={ContextValue}>
      {children}
    </PostboardContext.Provider>
  )
}

export default PostboardContextProvider
