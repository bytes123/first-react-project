import React from 'react'

function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case 'SET_COCKTAILS':
      return { ...state, cocktails: payload }
    case 'LOADING':
      return { ...state, loading: payload }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: payload }
  }
}

export default reducer
