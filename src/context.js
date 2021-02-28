import React, { useState, useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const inittialState = {
  loading: true,
  searchTerm: 'a',
  cocktails: [],
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inittialState)

  const setSearchTerm = (value) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: value })
  }

  const submitForm = (e) => {
    e.preventDefault()
  }

  const toggleLoading = (bool) => {
    dispatch({ type: 'LOADING', payload: bool })
  }

  const fetchApi = useCallback(async () => {
    try {
      toggleLoading(true)
      const res = await fetch(`${url}${state.searchTerm}`)
      const data = await res.json()
      const { drinks } = data
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })

        dispatch({ type: 'SET_COCKTAILS', payload: newCocktails })
        console.log(state.cocktails)
      } else {
        dispatch({ type: 'SET_COCKTAILS', payload: [] })
      }

      toggleLoading(false)
    } catch (err) {
      console.log(err)
      dispatch({ type: 'LOADING' })
    }
  }, [state.searchTerm])

  useEffect(() => {
    fetchApi()
  }, [state.searchTerm, fetchApi])

  return (
    <AppContext.Provider
      value={{
        ...state,
        setSearchTerm,
        submitForm,
        toggleLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
