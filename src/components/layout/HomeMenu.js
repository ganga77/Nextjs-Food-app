'use client'
import SectionHeaders from "./SectionHeaders"
import MenuItem from "./menu/MenuItem"
import { useEffect, useState } from "react"
export default function HomeMenu(){
    const [menu, setMenu] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/api/menu-items').
        then(response => response.json()).then(data => {
            const bestSellers = data.slice(-3)
            
            setMenu(bestSellers)
        })
    }, [])
    return (
        <section className="">
            <div className="text-center">
            <SectionHeaders mainHeader={"Our BestSellers"} subHeader={"Checkout"}/>
            <div className="grid grid-cols-3 gap-4">
                {menu?.length >0 && menu.map(item => <MenuItem {...item}/>)}
            </div>
        </div>

        <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto text-center">
        <p className="text-lg">&copy; 2024 Paji Company. All rights reserved.</p>
        <div className="mt-4">
            <a href="/about-us" className="text-gray-400 hover:text-white px-4">About Us</a>
            <a href="/" className="text-gray-400 hover:text-white px-4">Contact Us</a>
            <a href="#" className="text-gray-400 hover:text-white px-4">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white px-4">Terms of Service</a>
        </div>
    </div>
</footer>

        </section>

        
    )
}