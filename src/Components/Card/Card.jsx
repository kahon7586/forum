import React from 'react'

const Card = ({ info: { category, title, content, postTime} }) => {

  const date = new Date(postTime.seconds * 1000)
  const userLocales = navigator.language
  
  const formatedPostTime = date.toLocaleString(userLocales)

  return (
    <div className="card mb-2" >
      <p className="card-header fs-6">{category}</p>
      <div className="card-body">
        <p className="card-title fs-4">{title}</p>
        <p className="card-content">{content}</p>
      </div>
      <div className="card-footer d-flex justify-content-end text-body-secondary">{formatedPostTime}</div>
    </div>
  )
}

export default Card
