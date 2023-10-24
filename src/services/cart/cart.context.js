import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  //   const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  const addToCart = (item, currentRestaurant) => {
    // use case when switching restaurant
    if (!restaurant || restaurant.placeId !== currentRestaurant.placeId) {
      setRestaurant(currentRestaurant);
      setCart([item]);
    }
    setCart([...cart, item]);
  };

  const clearCart = () => {
    setCart([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      values={{
        addToCart,
        clearCart,
        user,
        restaurant,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
