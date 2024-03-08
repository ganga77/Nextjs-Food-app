'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function UserTabs(){
    const path = usePathname();
    return (
        <div className="flex mx-auto  gap-2 tabs py-4 px-2 justify-center">
                    <Link className={path === '/categories' ? 'active': ''} href={'/categories'}>Categories</Link>
                    <Link className={path === '/menu-items' ? 'active': ''} href={'/menu-items'}>Items</Link>
                    <Link className={path === '/users' ? 'active': ''} href={'/users'}>Users</Link>
                </div>
    )
}