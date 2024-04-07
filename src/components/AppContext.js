'use client'
import { SessionProvider } from "next-auth/react";
import { createContext } from "react";
import { useState, useEffect } from "react";

export const CartContext = createContext({});


// Calculating total price of the cart
export function cartProductPrice(cartProduct){
    let price = 0;
    if(cartProduct.size){
        price+=cartProduct.size.price
    }

    if(cartProduct.extras?.length > 0){
        for (const extra of cartProduct.extras){
            price+=extra.price
        }
    }

    return price
}




//This is the component for loggedin sessions and maintaining cart
export default function AppContext({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [carDetails, setCarDetails] = useState([])


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

    // function addToCart(product, size = null, extras = []) {
    //     setCartProducts(prevProducts => {
    //         const cartProduct = { ...product, size, extras };
    //         const newProduct = [...prevProducts, cartProduct];
    //         saveCartProductsToLocalStorage(newProduct)
    //         return newProduct
    //     })
    // }


    function addToCart(product) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product };
            const newProduct = [...prevProducts, cartProduct];
            saveCartProductsToLocalStorage(newProduct)
            return newProduct
        })
    }

    // function addToStore(car){
    //     setCarDetails(prevCar => {
    //         const carDemo = {...car}
    //         const newCar = [...prevCar, carDemo]
    //         saveCartProductsToLocalStorage(newCar)
    //         return newCar
    //     })
    // }

    
    

    return (
        <SessionProvider>

            <CartContext.Provider value={{ cartProducts, carDetails, setCartProducts, addToCart, removeCartProduct, clearCart, cartProductPrice }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}