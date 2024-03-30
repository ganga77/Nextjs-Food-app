import { useContext, useState } from "react"
import { CartContext } from "@/components/AppContext"
import Image from "next/image"

export default function MenuItem(menuItem) {

    const { name, basePrice, image, description, sizes, extraIngredientsPrices } = menuItem

    const { addToCart } = useContext(CartContext)

    const [showPopUp, setShowPopUp] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectExtraThing, setSelectExtraThing] = useState([])
    


    function handleAddToCartButtonClick() {
        const hasOptions = sizes.length > 0 || extraIngredientsPrices.length > 0
        if(hasOptions && !showPopUp){
            setShowPopUp(true)
            return;
        }
        
            addToCart(menuItem, selectedSize, selectExtraThing)
            setShowPopUp(false)

    }

    // This function is for extra Ingredientes (checkboxes)
    function handleExtraThingClick(ev, extraThing) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectExtraThing(prevThings => [...prevThings, extraThing]);
        } else {
            setSelectExtraThing(prevThings =>
                prevThings.filter(thing => thing.name !== extraThing.name)
            );
        }
        
    }
    

    let selectedPrice = 0;
    if(selectedSize){
        selectedPrice+= selectedSize.price
    }
    if(selectExtraThing?.length > 0){
        for(let extra of selectExtraThing){
            selectedPrice += extra.price
        }
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
                        style={{maxHeight: 'calc(100vh - 100px)'}}>
                        <Image
                            src={image}
                            alt={name}
                            width={300} height={200}
                            className="mx-auto"

                        />
                        <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                        {sizes?.length > 0 && (
                            <div className="py-2">
                                <h3>Pick your size</h3>
                                {sizes.map(size => (
                                    <label className="flex items-center gap-1 block p-2 rounded-md mb-1">
                                        <input type="radio" 
                                        onClick={()=>(setSelectedSize(size))}
                                        checked={selectedSize?.name === size.name}
                                        name="size" />
                                        {size.name} ${size.price}
                                    </label>
                                ))}
                            </div>
                        )}

                        {extraIngredientsPrices?.length > 0 && (
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

                        <button className="bg-primary text-white"
                         onClick={handleAddToCartButtonClick}
                       >
                            Add to Cart ${selectedPrice}
                            </button>
                        <button className="mt-2"
                        onClick={()=>setShowPopUp(false)}>Cancel</button>
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
                        {(sizes.length > 0 && extraIngredientsPrices.length > 0 ) ? (
                            <span>From ${basePrice}</span>
                        ) : <span>Add to cart ${basePrice}</span>}
                    
                </button>
            </div>
        </>
    )
}