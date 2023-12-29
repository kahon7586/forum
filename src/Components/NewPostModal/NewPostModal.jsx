import React, { useContext, useEffect } from 'react'
import { PostboardContext } from '../Postboard/Postboard'
import { DataBaseContext } from '../../Context/DataBaseContextProvider'



const PostForm = () => {

  const { CATEGORIES } = useContext(PostboardContext)

  const { writeArticle } = useContext(DataBaseContext)

  useEffect(() => {
    const arr_targets = Array.from(document.getElementsByClassName("validation-target"))
    
    const removeInvalidClass = (event) => event.target.classList.remove('is-invalid')
    
    arr_targets.forEach( (target) => {
      target.addEventListener('focus', removeInvalidClass)
    })

    // ----- setup -----

    const removeListener = () => {
      arr_targets.forEach( (target) => {
        target.removeEventListener('focus', removeInvalidClass)
      })
    }
  
    return removeListener
  })


  const handleSubmit = () => {

    const arr_targets = Array.from(document.getElementsByClassName("validation-target"))

    let isEveryTargetValid = true

    const sendNewPost = () => {
      const formData = new FormData( document.getElementById("newPost-form") ) 
      // FormData is a set of key/value pairs, but not a obj. So it can't be console.log directly
      const formDataObj = Object.fromEntries(formData)
      console.log(formDataObj)
      const {category, content, title} = Object.fromEntries(formData)
      writeArticle(category, content, title)
    }

    const checkTargetValid = () => {
      
      const TargetValid = (target) => {

        if(target.checkValidity() === true) {
          target.classList.remove('is-invalid')
        }else{
          isEveryTargetValid = false
          target.classList.add("is-invalid")
        }
      }  

      arr_targets.forEach( TargetValid )
    }

    checkTargetValid()
    
    if( isEveryTargetValid ) {
      sendNewPost()
      window.location.reload();
    }

  }

  const CategoryOptions = () => {
    return CATEGORIES.map((category) => {
      return <option value={category} key={category}>{category}</option>
    })
  }

  return (
    <form className='' id="newPost-form" noValidate>

      <div className="mb-3">
        <label className="form-label" htmlFor="category">Category</label>
        <select className='form-select validation-target' id='category' name='category' required>
          <option value="">Choose a category</option>
          <CategoryOptions/>
        </select>
          <div className="invalid-feedback">Choose a category</div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="title">Title</label>
        <input className="form-control validation-target" type="text" id='title' name='title' required/>
        <div className="invalid-feedback">Please fill the title</div>
      </div>

      <div className="mb-3">
        <label className='form-label' htmlFor="content">Content</label>
        <textarea className="form-control validation-target" id='content' name='content' required/>
        <div className="invalid-feedback">Please fill the content</div>
      </div>

      <div className="mb-3 gap-2 d-flex justify-content-end">
        <button className="btn btn-primary" type='button' onClick={handleSubmit} >Post</button>
        <button className="btn btn-outline-secondary" data-bs-dismiss="modal" type="button">Cancel</button>
      </div>

    </form>
  )
}

export const NewPostModal = () => {



  return (
    <>
      <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#post-modal">Post</button>

      <div className='modal fade' id="post-modal" tabIndex={-1} >
        <div className="modal-dialog ">
          <div className="modal-content px-4 py-2">

            <div className="modal-header mb-4">
              <h5 className="modal-title">Add a new Post</h5>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
            </div>

            <PostForm/>

          </div>
        </div>
      </div>
    </>
  )
}

export default NewPostModal
