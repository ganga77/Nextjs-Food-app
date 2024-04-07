'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import { useContext } from "react";
import { CartContext } from "@/components/AppContext"

export default function AddressInput({totalPrice, cartProducts}) {
    const session = useSession();
    const { status } = session;
    const {  clearCart} = useContext(CartContext)
    

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setphone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('')
    const [orderNames, setOrderNames] = useState([]); 
    



// useEffect(() => {
//     const extractedNames = cartProducts.map(product => {
//         const extraIngredients = product.extras.map(ingredient => ({
//             name: ingredient.name,
//             price: ingredient.price
//         }));
//         return {
//             name: product.name,
//             size: product.size.name,
//             extraIngredients: extraIngredients
//         };
//     });
//     setOrderNames(extractedNames);
// }, [cartProducts]);




console.log(`Order Names are: ${orderNames}`)

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            fetch('http://localhost:3000/api/profile').then(response => {
                response.json().then(data => {
                    setEmail(data.email);
                    setphone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);

                })
            })
        }

    }, [session, status])

    async function handleOrderSubmit(ev){
        ev.preventDefault();

        try{
        const res = await fetch('http://localhost:3000/api/submitOrder', {
            method: 'POST',
            body: JSON.stringify({
                name: userName,
                email,
                streetAddress,
                phone,
                postalCode,
                city,
                country,
                orderNames,
                totalPrice
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {

            console.log('Order Placed')
            clearCart();

            

        } else {
            console.log('Order Failed to place')

        }
    }catch (err) {
        console.log('Error during updation', err)
    }
    } 
    
    return (
        <form className="max-w-ws mx-auto border" onSubmit={handleOrderSubmit}>
            <div>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="First and Last Name" />
                <input type="email" placeholder={session.data?.user?.email} disabled="true" />
                <input type="tel" placeholder={"phone"} value={phone} onChange={ev => setphone(ev.target.value)} />
                <input type="text" placeholder={"street Address"} value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                <div className="flex gap-4">
                    <input type="text" placeholder={"Postal Code"} value={postalCode} onChange={ev => setPostalCode(ev.target.value)} />
                    <input type="text" placeholder={"City"} value={city} onChange={ev => setCity(ev.target.value)} />
                </div>
                <input type="text" placeholder={"country"} value={country} onChange={ev => setCountry(ev.target.value)} />
                
                <button type="submit" className="bg-primary text-white rounded-full ">Pay ${totalPrice}</button>
                
            </div>
        </form>
    )
}