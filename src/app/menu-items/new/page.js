'use client'
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";

export default function NewMenuItem(){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [basePrice, setBasePrice] = useState(0);
    const [image, setImage] = useState('');
    

    

    async function handleFormSubmit(ev){
        ev.preventDefault();
        const res = await fetch('http://localhost:3000/api/menu-items', {
            method: 'POST',
            body: JSON.stringify({
                name, description, basePrice, image
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


    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <span>Show all menu items</span>
                </Link>
            </div>
            <form  onSubmit={handleFormSubmit} className="mt-8">
                <div className="flex items-start gap-4">
                    <div>
                        <EditableImage link={image} setLink={setImage}/>
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

                    
                    
                </div>
                <div>
                        <button className="mb-2">Create</button>
                    </div>
            </form>
            
        </section>
    )
}