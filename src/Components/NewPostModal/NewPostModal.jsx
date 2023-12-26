import React, { useContext } from 'react'
import { PostboardContext } from '../Postboard/Postboard'



const PostForm = () => {

  const { CATEGORIES } = useContext(PostboardContext)

  const CategoryOptions = () => {
    return CATEGORIES.map((category) => {
      return <option value={category} key={category}>{category}</option>
    })
  }

  const handleClickPost = () => {
    return
  }

  return (
    <form id="newPost-form">
      <div className="mb-3">
        <label className="form-label" htmlFor="category">Category</label>
        <select className='form-select' id='category' required>
          <option value="">Choose a category</option>
          <CategoryOptions/>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="title">Title</label>
        <input type="text" id='title' className="form-control" required/>
      </div>

      <div className="mb-3">
        <label className='form-label' htmlFor="content">Content</label>
        <textarea className="form-control" id='content' required/>
      </div>

      <button className="btn btn-outline-secondary" data-bs-dismiss="modal" type="button">Cancel</button>
      <button className="btn btn-primary" type='submit' onClick={handleClickPost}>Post</button>
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

            <div className="modal-footer mt-4">

            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default NewPostModal
