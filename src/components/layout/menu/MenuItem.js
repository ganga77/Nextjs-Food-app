import { useContext, useState } from "react"
import { CartContext } from "@/components/AppContext"
import Image from "next/image"

export default function MenuItem(menuItem) {

    const { name, basePrice, image, description, sizes, extraIngredientsPrices } = menuItem

    const { addToCart, cartProducts } = useContext(CartContext)

    const [showPopUp, setShowPopUp] = useState(false)

    function handleAddToCartButtonClick() {
        // if there are no sizes and extraIngredients
        if (sizes.length === 0 && extraIngredientPrices.length === 0) {
            addToCart(menuItem)
        } else {
            setShowPopUp(true)
        }

    }
    return (
        <>
            {showPopUp && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg max-w-md">
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
                                        <input type="radio" name="size" />{size.name} ${size.price}
                                    </label>
                                ))}
                            </div>
                        )}

                        {extraIngredientsPrices?.length > 0 && (
                            <div className="py-2">
                                <h3>Pick your toppings</h3>
                                {extraIngredientsPrices.map(ing => (
                                    <label className="flex items-center gap-1 block p-2 rounded-md mb-1">
                                        <input type="radio" name="extraIng" />{ing.name} ${ing.price}
                                    </label>
                                ))}
                            </div>
                        )}
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
                    Add to cart ${basePrice}
                </button>
            </div>
        </>
    )
}