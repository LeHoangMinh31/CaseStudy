import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import api from "../api";

export const CartContext = React.createContext({})

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { signedInUsername } = useContext(AuthenticationContext)

  useEffect(() => {
    (async () => {
      if (signedInUsername) {
        if (signedInUsername) {
          const cartResponse = await api.get(`carts?username=${signedInUsername}`)
          setCartItems(cartResponse.data)
          setIsLoading(false)
        }
      }
    })()
  }, [signedInUsername])

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider