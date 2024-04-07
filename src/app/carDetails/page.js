'use client'
import { useContext } from "react"
import { CartContext } from "@/components/AppContext"

export default function CarDetails() {
    const { cartProducts } = useContext(CartContext)
    
    console.log("Car details:", cartProducts);

    return (
        <div>
            <ul>
                {cartProducts.map(car => (
                    <li key={car.id}>{car.name}</li>
                ))}
            </ul>
        </div>
    );
}
