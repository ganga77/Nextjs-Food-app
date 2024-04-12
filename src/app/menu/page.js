'use client'
import SectionHeaders from "@/components/layout/SectionHeaders"
import MenuItem from "@/components/layout/menu/MenuItem"
import { useState, useEffect } from "react"
import Link from "next/link"
export default function Menu(){
    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/api/categories').then(response => {
            response.json().then(data => {
                setCategories(data);
            })
        })

        fetch('http://localhost:3000/api/menu-items')
        .then(res => res.json()).then(items => setMenuItems(items))
    }, [])

    console.log(menuItems)
    return (
        <>
        <section>
        <div className="text-center animate-blink text-primary">
                <Link href={'/filter'}>Filter Cars by Price</Link>

            </div>
        </section>
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div>
                    <div className="text-center">
                    <SectionHeaders subHeader={c.name}/>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-6 mb-8">
                        {menuItems.filter(items => c._id === items.category).map(item => 
                            <MenuItem {...item}/>)}
                    </div>
                </div>
            ))}
        </section>
        </>
        
    )
}