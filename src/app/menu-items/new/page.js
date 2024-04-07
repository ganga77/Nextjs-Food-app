'use client'
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";

export default function NewMenuItem() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [basePrice, setBasePrice] = useState(0);
    const [image, setImage] = useState([]);
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [color, setColor] = useState('')
    const [driven, setDriven] = useState('')
    const [vin, setVin] = useState('')

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const res = await fetch('http://localhost:3000/api/menu-items', {
            method: 'POST',
            body: JSON.stringify({
                name, description, basePrice, image, model, year, color, driven, vin
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.ok) {
            const form = ev.target;
            form.reset();
            console.log('Items Created')

        } else {
            console.log('Item Registration Failed')

        }
    }


    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <span>Show all Cars</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8">
                <div className="flex items-start gap-4">
                    <div>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Car Name</label>
                        <input type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <label>Description</label>
                        <input type="text"
                            value={description}
                            onChange={ev => setDescription(ev.target.value)} />

                        <label>Model</label>
                        <input type="text"
                            value={model}
                            onChange={ev => setModel(ev.target.value)} />

                        <label>Year</label>
                        <input type="text"
                            value={year}
                            onChange={ev => setYear(ev.target.value)} />

                        <label>Color</label>
                        <input type="text"
                            value={color}
                            onChange={ev => setColor(ev.target.value)} />

                        <label>Kms Driven</label>
                        <input type="text"
                            value={driven}
                            onChange={ev => setDriven(ev.target.value)} />

                        <label>VIN</label>
                        <input type="text"
                            value={vin}
                            onChange={ev => setVin(ev.target.value)} />

                        <label>Base Price</label>
                        <input type="number"
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)} />
                    </div>



                </div>
                <div>
                    <button className="mb-2">Create</button>
                </div>
            </form>

        </section>
    )
}