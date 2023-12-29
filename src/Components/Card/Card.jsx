import React from 'react'

const Card = ({ info: { category, title, content} }) => {
  return (
    <div className="card mb-2" >
      <p className="card-header fs-6">{category}</p>
      <div className="card-body">
        <p className="card-title fs-4">{title}</p>
        <p className="card-content">{content}</p>
      </div>
    </div>
  )
}

export default Card
