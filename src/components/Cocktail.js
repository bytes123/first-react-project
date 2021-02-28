import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
const Cocktail = ({ id, name, image, info, glass }) => {
  const { setSearchTerm } = useGlobalContext()
  return (
    <article className='cocktail'>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='cocktail-footer'>
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link
          to={`/cocktail/${id}`}
          className='btn btn-primary btn-details'
          onClick={() => setSearchTerm('')}
        >
          Details
        </Link>
      </div>
    </article>
  )
}

export default Cocktail
