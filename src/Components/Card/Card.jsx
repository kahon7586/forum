import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../Context/AuthContextProvider'
import { useDataBase } from '../../Context/DataBaseContextProvider'

const Card = ({ info: { category, title, content, postTime, userInfo, id} }) => {

  const { currentUser } = useAuth()

  let deleteButton = null

  if( currentUser?.uid === userInfo.uid ){
    deleteButton = <DeleteButton postID={id} />
  }

  const date = new Date(postTime.seconds * 1000)
  const userLocales = navigator.language
  
  const formatedPostTime = date.toLocaleString(userLocales)


  return (
    <div className="card mb-2" >
      <div className="card-header d-flex justify-content-between fs-6 ">
        <p className='mb-0'>{category}</p>
        <div className="wrapper position-relative">
          {deleteButton}
        </div>
      </div>
      <div className="card-body">
        <p className="card-title fs-4">{title}</p>
        <p className="card-content">{content}</p>
      </div>
      <div className="card-footer d-flex justify-content-between text-body-secondary">
        <p className='mb-0'>{formatedPostTime}</p>
        <p className='mb-0'>{userInfo.email}</p>
      </div>
    </div>
  )
}



export default Card


const DeleteButton = ({ postID: id }) => {

  const { deletePost } = useDataBase()

  const closeBtnRef = useRef(null)
  const popoverRef = useRef(null)
  const deleteBtnRef = useRef(null)

  const [show, setShow] = useState(false)
  const [deleting, setdeleting] = useState(false)

  useEffect(() => {

    function handleClickEvent( event ) {
      console.log('Listener!')
      const target = event.target
      const isClickOutside = !( target === closeBtnRef.current 
        || target === popoverRef.current || popoverRef.current.contains(target) )
      
      if(isClickOutside){
        setShow(false)
      }
    }

    if(show){
      document.addEventListener('click', handleClickEvent)
    }

    function cleanUp() {
      document.removeEventListener('click', handleClickEvent)
    }

    return cleanUp

  },[show])

  const popoverDisplayProp = show === true ? "d-grid" : "d-none"
  const spinnerDisplayProp = deleting === true ? "d-inline-block" : "d-none"
  const deletingText = deleting === true ? "Deleting..." : "Delete"

  function handleCloseBtnClick() {
    setShow((prev) => !prev)
  }
  
  async function handleDeleteClick() {
    console.log('delete!')
    deleteBtnRef.current.disabled = true;
    setdeleting(true)
    await deletePost( id )
    window.location.reload()
  }

  const styleProp = `${popoverDisplayProp} position-absolute top-0 end-100 bg-light border border-dark-subtle rounded p-1`

  return(
    <>
      <button className="btn-close" ref={closeBtnRef} type="button" onClick={handleCloseBtnClick} aria-label="Close"></button>

      <div className={styleProp} ref={popoverRef}>
        <p className='mb-3 text-nowrap'>Delete this post?</p>
        <button className='btn btn-outline-danger ' onClick={handleDeleteClick} ref={deleteBtnRef}>
          <span className={`spinner-border spinner-border-sm ${spinnerDisplayProp}`} aria-hidden="true"></span>
          <span role="status">{deletingText}</span>
        </button>
      </div>
    </>
  )
}