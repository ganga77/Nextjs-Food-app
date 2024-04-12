'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
export default function Header() {

  // creating session after user is logged in
  const session = useSession();
  console.log(session);
  const status = session.status;
  const userData = session.data?.user;

  let userName = userData?.name

  const { cartProducts } = useContext(CartContext)


  return (
    <header className="flex items-center justify-between">
      <Link className="text-primary font-semibold text-2xl " href="/">Paji Car wale</Link>

      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href="/">Home</Link>
        <Link href="/menu">Showroom</Link>
        <Link href="/">About</Link>
        <Link href="/orders">Bookings </Link>

      </nav>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'} className="flex items-center gap-8 text-gray-500 font-semibold whitespace-nowrap">Hello {userName}</Link>
            <button onClick={signOut} className="bg-primary text-white rounded-full px-8 py-2" href={'/login'}>Logout</button>
            <Link href={'/cart'} className="relative"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{(cartProducts.length)}</span></Link>
          </>
        )}

        {status === 'unauthenticated' && (
          <>

            <Link href={'/login'}>Login</Link>
            <Link href={'/register'} className="bg-primary text-white rounded-full px-8 py-2">Register</Link>
          </>
        )}


      </nav>
    </header>
  )
}