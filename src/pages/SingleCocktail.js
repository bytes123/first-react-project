import React from 'react'
import Loading from '../components/Loading'
import { useGlobalContext } from '../context'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams()
  const { loading, toggleLoading } = useGlobalContext()
  const [cockTail, setCocktail] = React.useState()

  React.useEffect(() => {
    toggleLoading(true)
    async function getCocktail() {
      try {
        const res = await fetch(`${url}${id}`)
        const data = await res.json()
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instrucions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0]
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instrucions,
            ingredients,
          }
          setCocktail(newCocktail)
        } else {
          setCocktail(null)
        }
        toggleLoading(false)
      } catch (err) {
        console.error(err)
        toggleLoading(false)
      }
    }

    getCocktail()
  }, [id])

  if (loading) {
    return <Loading />
  }
  if (!cockTail) {
    return <h2 className='section-title'>no cocktail to display</h2>
  }
  const {
    name,
    image,
    info,
    category,
    glass,
    instructions,
    ingredients,
  } = cockTail

  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        Back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-date'>name:</span>
            {name}
          </p>
          <p>
            <span className='drink-date'>category:</span>
            {category}
          </p>
          <p>
            <span className='drink-date'>info:</span>
            {info}
          </p>
          <p>
            <span className='drink-date'>glass:</span>
            {glass}
          </p>
          <p>
            <span className='drink-date'>instrucions:</span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients:</span>
            {ingredients.map((item, index) => {
              return item ? <span key={item}>{item}</span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
