'use client'
import { SessionProvider } from "next-auth/react";
import { createContext } from "react";
import { useState, useEffect } from "react";

export const CartContext = createContext({});

//This is the component for loggedin sessions and maintaining cart
export default function AppContext({ children }) {
    const [cartProducts, setCartProducts] = useState([]);


    // Storing cart to local storage so after refreshing, the cart keeps the products. useEffect is used so when the app loads, then useEffect will check in loaclStrorage if we have products in it or not

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    }, [])
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    // To clear cart

    function clearCart() {
        setCartProducts([])
        saveCartProductsToLocalStorage([])
    }

    // To remove item from a cart

    function removeCartProduct(indexToRemove) {
        setCartProducts(prevCartProduct => {
            const newCartProducts = prevCartProduct.filter((v, index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts
        })
    }

    // Add items to cart

    function addToCart(product, size = null, extras = []) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product, size, extras };
            const newProduct = [...prevProducts, cartProduct];
            saveCartProductsToLocalStorage(newProduct)
            return newProduct
        })
    }

    return (
        <SessionProvider>

            <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}