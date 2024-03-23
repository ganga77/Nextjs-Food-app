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
      <Link className="text-primary font-semibold text-2xl " href="/">ST PIZZA</Link>

      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>

      </nav>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'} className="flex items-center gap-8 text-gray-500 font-semibold whitespace-nowrap">Hello {userName}</Link>
            <button onClick={signOut} className="bg-primary text-white rounded-full px-8 py-2" href={'/login'}>Logout</button>
            <Link href={'/'}>Cart {(cartProducts.length)}</Link>
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