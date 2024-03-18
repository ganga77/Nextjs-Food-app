'use client'
import UserTabs from "@/components/layout/UserTabs";
import useProfile from '../../components/useProfile'
import { useEffect, useState } from "react";

export default function Categories() {
    const [newCategoryName, setNewCateogoryName] = useState('')
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(null)

    const { loading: profileLoading, data: profileData } = useProfile();


    // By doing this we don't have to reload page. useEffect works after reloading.
    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories() {
        fetch('http://localhost:3000/api/categories').then(response => {
            response.json().then(data => {
                setCategories(data);
            })
        })
    }

    async function handleNewCategorySubmit(ev) {
        ev.preventDefault();

        const data = { name: newCategoryName };
        if (editedCategory) {
            data._id = editedCategory._id
        }
        const res = await fetch('http://localhost:3000/api/categories', {

            method: editedCategory ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // We will send only name for post and name & id for put
        })
        setNewCateogoryName('')
        fetchCategories(); // This is done so after creating nee category, the page will refresh
        if (res.ok) {
            console.log('Okay')
        } else {
            console.log('Not okay')
        }

    }

    if (profileLoading) {
        return "Loading....."
    }

    if (!profileData.admin) {
        return 'Not an admin...'
    }

    async function removeCategory(_id) {
        const res = await fetch('http://localhost:3000/api/categories?_id='+_id, {
            method: 'DELETE',
        });
    
        if (res.ok) {
            setCategories(prevCat => prevCat.filter(cat => cat._id !== _id));
            
        } else {
            console.error('Failed to delete the category');
        }
    }
    
    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs />
            <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>{editedCategory ? 'Update Category Name' : 'New Category Name'}</label>
                        <input type="text"
                            value={newCategoryName}
                            placeholder="Category"
                            onChange={ev => setNewCateogoryName(ev.target.value)} />
                    </div>
                    <div className="pb-2">
                        <button className="border border-primary rounded-full" type="submit">{editedCategory ? 'Update' : 'Create'}</button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500 ">Edit Category:</h2>


                {categories?.length > 0 && categories.map(c => (
                    <div className="flex w-full items-center justify-between mb-2">
                        <button
                            onClick={() => { setEditedCategory(c); setNewCateogoryName(c.name) }}
                            className="bg-gray-200 rounded-lg p-2 px-4 flex-1 cursor-pointer">
                            <span>{c.name}</span>
                        </button>

                        <button

                            onClick={() => removeCategory(c._id)}
                            className="flex-grow-0 w-1/3 bg-red-200 rounded-lg p-2 mx-2 justify-self-end">X
                        </button>
                    </div>
                ))}

            </div>
        </section>
    )
}