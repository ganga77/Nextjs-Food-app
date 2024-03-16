'use client'
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/useProfile";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
export default function MenuItems() {


    const { loading, data } = useProfile();
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetchMenuItems();
    }, [])

    function fetchMenuItems() {
        fetch('http://localhost:3000/api/menu-items').then(response => {
            response.json().then(data => {
                setMenuItems(data);
            })
        })
    }


    if (loading) {
        return "Loading..."
    }

    if (!data.admin) {
        return "Not an admin..."
    }

    return (
        <section className="mt-8 max-w-ms mx-auto">
            <UserTabs />
            <div className="mt-8">
                <Link
                    className="button flex"
                    href={'/menu-items/new'}>
                    <span>Create a new menu item</span>
                </Link>
                <div>
                    <h2 className="text-sm text-gray-500 mt-8">Edit Menu Item:</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {menuItems?.length > 0 && menuItems.map(item => (
                            <Link href={'/menu-items/edit/' + item._id} className="bg-gray-200 rounded-lg p-4">
                                <div className="w-24 h-24 flex items-center justify-center">
                                    <Image className="rounded-md" src={item.image} alt="item_image" width={200} height={200} objectFit="cover" />
                                </div>
                                <div className="text-center">
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </div>


                </div>
            </div>
        </section>
    )
}