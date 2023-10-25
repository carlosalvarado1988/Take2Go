import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  //   const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!cart.length) {
      setTotal(0);
      return;
    }
    setTotal(cart.reduce((acc, { price }) => acc + price, 0));
  }, [cart]);

  const addToCart = (item, currentRestaurant) => {
    // use case when switching restaurant
    if (!restaurant || restaurant.placeId !== currentRestaurant.placeId) {
      setRestaurant(currentRestaurant);
      setCart([item]);
      return;
    }
    setCart([...cart, item]);
  };

  const clearCart = () => {
    setCart([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        clearCart,
        restaurant,
        cart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
