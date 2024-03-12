'use client'
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/useProfile";
import { useState } from "react";


export default function MenuItems(){
    

    const {loading, data} = useProfile();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [basePrice, setBasePrice] = useState(0);

    async function handleFormSubmit(ev){
        ev.preventDefault();
        const res = await fetch('http://localhost:3000/api/menu-items', {
            method: 'POST',
            body: JSON.stringify({
                name, description, basePrice
            }),
            headers: {'Content-Type': 'application/json'}
        })

        if(res.ok){
            const form = ev.target;
            form.reset();
            console.log('Items Created')
            
        }else{
            console.log('Item Registration Failed')
            
        }
    }

    if(loading){
        return "Loading..."
    }

    if(!data.admin){
        return "Not an admin..."
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs />
            <form  onSubmit={handleFormSubmit} className="mt-8">
                <div className="flex items-start gap-4">
                    <div>
                        image
                    </div>
                    <div className="grow">
                        <label>Menu Item Name</label>
                        <input type="text"
                        value={name}
                        onChange={ev =>setName(ev.target.value)}/>
                        <label>Description</label>
                        <input  type="text"
                        value={description}
                        onChange={ev =>setDescription(ev.target.value)}/>
                        <label>Base Price</label>
                        <input type="text"
                        value={basePrice}
                        onChange={ev =>setBasePrice(ev.target.value)}/>
                    </div>
                    <div>
                        <button className="mb-2">Create</button>
                    </div>
                </div>
            </form>
            
        </section>
    )
}