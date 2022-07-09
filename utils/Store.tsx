import react, { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

type Action = {
  type: string
  payload: any
}

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [] },
}
export const Store = createContext({})

function reducer(state: { cart: any }, action: Action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload

      const existItem = state.cart.cartItems.find(
        (item: { slug: string }) => item.slug === newItem.slug
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item: { name: string }) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item: { slug: string }) => item.slug !== action.payload.slug
      )
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    default:
      return state
  }
}

type Props = {
  children?: react.ReactNode
}

export function StoreProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
