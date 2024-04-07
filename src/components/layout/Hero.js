import Image from "next/image"
export default function Hero(){
    return (
        <section className="grid grid-cols-2">
            <div className="py-8">
                <h1 className="text-4xl font-semibold">
                    You live once! Ride something that rattles your soul....
                </h1>
                <p className="my-4 text-gray-500">
                    A car never cheats! Let's Rev.....
                </p>

                <div className="flex gap-4">
                 <button className="bg-primary text-white px-8 py-2 rounded-full">Order a test drive</button>
                 <button className="flex gap-2 py-2 text-gray-600 font-semibold">Learn more about our latest beauties</button>
                </div>
            </div>
            <div className="relative">
            <Image src="/carLogo.png" layout="fill" objectFit="contain" />

            </div>
        </section>
    )
}