'use client'
import { useEffect, useState } from "react"
import MenuItem from "@/components/layout/menu/MenuItem"
import SectionHeaders from "@/components/layout/SectionHeaders"
export default function Filter(){
    const [menuItems, setMenuItems] = useState([])
    const [price, setPrice] = useState()
    const [showCars, setShowCars] = useState(false)
    const [filteredMenu, setFilteredMenu] = useState([])
    const [categories, setCategories] = useState([])
    useEffect(()=>{

        fetch('http://localhost:3000/api/categories').then(response => {
            response.json().then(data => {
                setCategories(data);
            })
        })

        fetch('http://localhost:3000/api/menu-items')
        .then(res => res.json()).then(items => setMenuItems(items))
    }, [])

    function handlePriceFilter(ev){
        ev.preventDefault();
        const filteredMenudemo = menuItems.filter(item => item.basePrice <= price)
        setShowCars(true)
        setFilteredMenu(filteredMenudemo)
        console.log('Filtered cars:', filteredMenudemo)

    }

    return (
        <>
        {showCars && (
             <section className="mt-8">
             {categories?.length > 0 && categories.map(c => (
                 <div>
                     <div className="text-center">
                     <SectionHeaders subHeader={c.name}/>
                     </div>
 
                     <div className="grid grid-cols-3 gap-4 mt-6 mb-8">
                         {filteredMenu.filter(items => c._id === items.category).map(item => 
                             <MenuItem {...item}/>)}
                     </div>
                 </div>
             ))}
         </section>
        )}
        {!showCars && (
            <form onSubmit={handlePriceFilter}>
            <label>Enter your budget. We will search cars for you</label>
            <input type="text"
                                value={price}
                                placeholder="Enter Price"
                                onChange={ev => setPrice(ev.target.value)} />
    
                                <button className="border border-primary rounded-full" type="submit">Search</button>
            </form>
        )}
        
        </>
    )
}