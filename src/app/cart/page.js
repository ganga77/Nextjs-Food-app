'use client'
import { CartContext } from "@/components/AppContext"
import SectionHeaders from "@/components/layout/SectionHeaders"
import { useContext } from "react"
import Image from "next/image"
import {cartProductPrice} from '../../components/AppContext'
import AddressInput from '../../components/layout/AddressInput'
import { useSession } from "next-auth/react"
export default function Cart() {

    const session = useSession();
    const { status } = session;
    console.log(status)
    const { cartProducts, clearCart, removeCartProduct } = useContext(CartContext)
    
console.log(cartProducts)
    let totalPrice = 0;
    let items = 0;
    for (let prod of cartProducts){
        totalPrice+=cartProductPrice(prod)
        items+=1;
    }

    
    
    return (
        <section className="mt-8">
            
            <div className="text-center">
                <SectionHeaders subHeader="Cart" />
            </div>
            <div>
                
                Your cart has: {items} items
            </div>
            <div className="mt-4 grid gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div className="text-center animate-blink text-primary">
                        No Products in the shopping cart. Explore Menu to order some pizza
                    </div>
                    )}

                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div className="flex items-center gap-4 mb-2 border-b py-2">
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={product.name} />
                            </div>
                            <div>
                                <h3>{product.name}</h3>
                                {product.size && (
                                    <div className="text-sm text-gray-500"> Size: <span>{product.size.name}</span></div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div className="text-sm text-gray-500">{product.extras.map(extra => (<div>{extra.name} ${extra.price}</div>))}</div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">{cartProductPrice(product)}</div>
                            
                            <div>
                                <button onClick={() =>removeCartProduct(index)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <AddressInput totalPrice={totalPrice} cartProducts={cartProducts}/>

                </div>
               
            </div>
           
            <button onClick={clearCart}>Clear Cart</button>
        </section>
    )
}