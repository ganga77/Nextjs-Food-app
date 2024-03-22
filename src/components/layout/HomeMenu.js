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
        </section>
    )
}