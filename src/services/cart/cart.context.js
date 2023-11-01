import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [total, setTotal] = useState(0);

  const saveCart = async (currentRestaurant, currentCart, uid) => {
    try {
      const jsonValue = JSON.stringify({
        restaurant: currentRestaurant,
        cart: currentCart,
      });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCart = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && cart.length > 0) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [restaurant, cart, user]);

  useEffect(() => {
    if (!cart?.length) {
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
