'use client'
import { useState, useEffect } from "react";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditItem() {
    const { id } = useParams();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [basePrice, setBasePrice] = useState(0);
    const [image, setImage] = useState('');
    const [sizes, setSizes] = useState([]); // This state will be used for adding and editin sizes

    useEffect(() => {
        fetchMenuItems();
    }, [])

    function fetchMenuItems() {
        fetch('http://localhost:3000/api/menu-items').then(response => {
            response.json().then(data => {
                const foundItem = data.find(item => item._id === id);

                setName(foundItem.name)
                setImage(foundItem.image)
                setDescription(foundItem.description)
                setBasePrice(foundItem.basePrice)
            })
        })
    }

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const res = await fetch('http://localhost:3000/api/menu-items', {
            method: 'PUT',
            body: JSON.stringify({
                name, description, basePrice, image, _id: id
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.ok) {
            const form = ev.target;
            form.reset();
            console.log('Items Updated')

        } else {
            console.log('Item Updation Failed')

        }
    }


    function addSize() {
        setSizes(oldSizes => {
            return [...oldSizes, { name: '', price: 0 }]
        })
    }

    function editSizes(ev, index, prop){
        const newValue = ev.target.value;
        setSizes(prevSizes =>{
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes;
        })
    }

    function removeItem(index){
        setSizes(prevSize => prevSize.filter((value, i) => i !== index))
    }

    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <span>Show all menu items</span>
                </Link>
                {name}
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8">
                <div className="flex items-start gap-4">
                    <div>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Menu Item Name</label>
                        <input type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <label>Description</label>
                        <input type="text"
                            value={description}
                            onChange={ev => setDescription(ev.target.value)} />
                        <label>Base Price</label>
                        <input type="text"
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)} />
                        <div className="bg-gray-200 p-2 rounded-md mb-2">
                            <label>Sizes</label>
                            {sizes?.length > 0 && sizes.map((size, index) => (
                                <div className="flex gap-2">
                                    <div>
                                        <label>Size name</label>
                                        <input type="text" value={size.name} placeholder="Size name"
                                        onChange = {ev => editSizes(ev, index, 'name')} />


                                    </div>
                                    <div>
                                        <label>Extra Price</label>
                                        <input type="number" value={size.price} placeholder="Price" 
                                        onChange={ev=> editSizes(ev, index, 'price')}/>
                                    </div>
                                    <div>
                                        <button type="button" className="bg-white mt-2"
                                        onClick={()=>removeItem(index)}>X</button>
                                        </div>
                                </div>
                            ))}
                            <button className="bg-white" onClick={addSize}>Add size</button>
                        </div>
                    </div>


                </div>
                <div>
                    <button className="mb-2"

                    >Edit</button>
                </div>
            </form>

        </section>
    )
}