import React, { useContext, useEffect } from 'react'
import { PostboardContext } from '../Postboard/Postboard'
import { NewPostModal as NewPost } from '../NewPostModal/NewPostModal'
const Tab = () => {

  const { currentCategory, setCurrentCategory, setCurrentPage, CATEGORIES } = useContext(PostboardContext)

  useEffect(() => {
    document.getElementById(`category-${currentCategory}`).classList.add("active")
  })

  const CategoryButtons = () => {

    const categoryTabs = ["All", ...CATEGORIES]

    return categoryTabs.map((category) => {

      const handleClickCategory = () => {
        setCurrentCategory(category)
        setCurrentPage(1)
      }

      return <button className='nav-link' onClick={handleClickCategory} role="tab" id={`category-${category}`} key={category} data-bs-toggle="tab">{category}</button>
    })
  }

  return (
    <ul className='nav nav-tabs d-flex justify-content-between'>
      <li className="nav-item" role="group">
        <ul className="category-wrapper d-flex ps-0">
          <CategoryButtons/>
        </ul>
      </li>

      <li className='nav-item' >
        <NewPost/>
      </li>
    </ul>
  )
}

export default Tab
