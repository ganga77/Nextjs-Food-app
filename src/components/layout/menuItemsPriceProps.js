import { useState } from "react";

export default function MenuItemPriceProps({ propName, propLabel, props, setProps }) {
const [isOpen, setIsOpen] = useState(false);


    function addSize() {
        setProps(oldSizes => {
            return [...oldSizes, { name: '', price: 0 }]
        })
    }

    function editSizes(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes;
        })
    }

    function removeItem(index) {
        setProps(prevSize => prevSize.filter((value, i) => i !== index))
    }



    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">


            <div className="inline-flex">
                <button
                    className=" p-1 border-0 justify-start"
                    type="button"
                    onClick={() => setIsOpen(prev => !prev)}
                ><span>
                        {isOpen && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                          </svg>
                          
                        )}
                        
                        {!isOpen && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                        )}

                        {propName}
                        ({props?.length})
                        </span>
                </button>
            </div>

            <div className={isOpen ? 'block' : 'hidden'} >
            {props?.length > 0 && props.map((size, index) => (
                <div className="flex gap-2">
                    <div>
                        <label>Size name</label>
                        
                        <input type="text" value={size.name} placeholder="Size name"
                            onChange={ev => editSizes(ev, index, 'name')} />


                    </div>
                    <div>
                        <label>Total Price</label>
                        <input type="number" value={size.price} placeholder="Price"
                            onChange={ev => editSizes(ev, index, 'price')} />
                    </div>
                    <div>
                        <button type="button" className="bg-white mt-2"
                            onClick={() => removeItem(index)}>X</button>
                    </div>
                </div>
            ))}
            <button className="bg-white" onClick={addSize}>{propLabel}</button>
            </div>
        </div>
    )
}