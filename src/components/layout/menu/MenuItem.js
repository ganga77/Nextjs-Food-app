export default function MenuItem(){
    return (
        <div className="bg-white-300 p-4 rounded-lg text-center hover:bg-primary transition-all">
                    <div className="text-center">
                    <img src={'pizza.png'} className="max-h-auto max-h-24 block mx-auto" alt=""/>
                    </div>
                    <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
                    <p className="text-gray-500 text-sm"></p>
                    <button className="bg-black text-white rounded-full py-2 px-4">Add to cart $12</button>
                </div>
    )
}