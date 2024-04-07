import { useContext, useState } from "react"
import { CartContext } from "@/components/AppContext"
import Image from "next/image"
import Link from "next/link"



export default function MenuItem(menuItem) {
    const { name, description, basePrice, image, model, year, color, driven, vin } = menuItem

    const { addToCart } = useContext(CartContext)
   
    const [showPopUp, setShowPopUp] = useState(false)
   



    function handleAddToCartButtonClick() {

        if (!showPopUp) {
            setShowPopUp(true)
            
            return;
        }



        addToCart(menuItem)
       
        
        setShowPopUp(false)
        

    }

    

    return (
        <>
       
            {showPopUp && (

                <div
                    onClick={() => setShowPopUp(false)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center">

                    <div
                        onClick={ev => ev.stopPropagation()}
                        className="my-8 bg-white p-2 rounded-lg max-w-md">
                        <div className="overflow-y-scroll p-2"
                            style={{ maxHeight: 'calc(100vh - 100px)' }}>
                            <Image
                                src={image}
                                alt={name}
                                width={300} height={200}
                                className="mx-auto"

                            />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">About Car: {description}</p>
                            <p className="text-center text-gray-500 text-sm mb-2">Model: {model}</p>
                            <p className="text-center text-gray-500 text-sm mb-2">Year: {year}</p>
                            <p className="text-center text-gray-500 text-sm mb-2">Color: {color}</p>
                            <p className="text-center text-gray-500 text-sm mb-2">Price: {basePrice}</p>

<p className="text-center text-gray-500 text-sm mb-2">Kms Driven: {driven}km</p>
<p className="text-center text-gray-500 text-sm mb-2">VIN#: {vin}</p>
                            {/* {extraIngredientsPrices?.length > 0 && (
                            <div className="py-2">
                                <h3>Pick your toppings</h3>
                                
                                {extraIngredientsPrices.map(ing => (
                                    <label className="flex items-center gap-1 block p-2 rounded-md mb-1">
                                        <input type="checkbox" 
                                        onClick={(ev) =>(handleExtraThingClick(ev, ing))}
                                        name={ing.name} />
                                        {ing.name} ${ing.price}
                                    </label>
                                ))}
                            </div>
                        )}
 */}
                           <button className="bg-primary text-white"
                         onClick={handleAddToCartButtonClick}
                       >
                            Book Test Drive for
                            </button>

                        



                            <button className="mt-2"
                                onClick={() => setShowPopUp(false)}>Cancel</button>
                        </div>

                    </div>
                </div>
            )}
            <div className="bg-white-300 p-4 rounded-lg text-center hover:bg-primary transition-all">
                <div className="text-center">
                    <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="" />
                </div>
                <h4 className="font-semibold text-xl my-3">{name}</h4>
                <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
                <button
                    type="button"
                    onClick={handleAddToCartButtonClick}
                    className="bg-black text-white rounded-full py-2 px-4">
                    <span>Test Drive</span>

                </button>
            </div>
        </>
    )
}