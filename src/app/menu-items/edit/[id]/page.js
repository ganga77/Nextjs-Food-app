'use client'
import { useState, useEffect } from "react";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import Link from "next/link";
import { useParams } from "next/navigation";
import MenuItemPriceProps from '../../../../components/layout/menuItemsPriceProps'
export default function EditItem() {
    const { id } = useParams();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
   const [basePrice, setBasePrice] = useState(0);
    const [image, setImage] = useState('');
    const [sizes, setSizes] = useState([]); // This state will be used for adding and editin sizes
    const [extraIngredientsPrices, setExtraIngredientPrices] = useState([]);
    const [category, setCategory] = useState('65fcd2d46face88cd3ceb37d')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchMenuItems();
    }, [])

    function fetchMenuItems() {
        fetch('http://localhost:3000/api/menu-items').then(response => {
            response.json().then(data => {
                const foundItem = data.find(item => item._id === id);
                console.log(foundItem)
                setName(foundItem.name)
                setImage(foundItem.image)
                setDescription(foundItem.description)
                setBasePrice(foundItem.basePrice)
                setSizes(foundItem?.sizes)
                setExtraIngredientPrices(foundItem?.extraIngredientsPrices);
            })
        })
    }

    useEffect(() =>{
        fetch('http://localhost:3000/api/categories').then(response =>{
            response.json().then(data => {
                setCategories(data)
            })
        })
    }, [])

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const res = await fetch('http://localhost:3000/api/menu-items', {
            method: 'PUT',
            body: JSON.stringify({
                name, 
                description, 
                basePrice, 
                image, _id: id, sizes, extraIngredientsPrices, category
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.ok) {
            const form = ev.target;
            form.reset();
            

        } else {
            console.log('Item Updation Failed')

        }
    }

    async function removeMenuItem(id){
        const res = await fetch('http://localhost:3000/api/menu-items?_id='+ id, {
            method: 'DELETE'
        });

        if(res.ok){
            console.log('Item Deleted')
            fetchMenuItems();
        }else{
            console.log('Item failed to delete')
        }
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

                            <label>Category</label>
                            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                                {categories?.length > 0 && categories.map(c => (
                                    <option value={c._id}>{c.name}</option>
                                ))}
                            </select>
                            
                        <label>Base Price</label>
                        <input type="text"
                            value={basePrice}
                            onChange={ev => setBasePrice(ev.target.value)} />
                        

                    </div>
                    


                </div>
                <MenuItemPriceProps propName={"Sizes"} propLabel={"Add Size"} props={sizes} setProps={setSizes}/>
                <MenuItemPriceProps propName={"Extra Toppings"} propLabel={"Add Toppings Price"} props={extraIngredientsPrices} setProps={setExtraIngredientPrices}/>
                <div>
                    <button className="bg-primary text-white mb-2 hover:bg-yellow-500"

                    >Edit</button>
                </div>
                
            </form>
            <div>
                    <button className="bg-primary text-white mb-2 hover:bg-yellow-500"
                    onClick={()=>removeMenuItem(id)}

                    >Delete</button>
                </div>

        </section>
    )
}