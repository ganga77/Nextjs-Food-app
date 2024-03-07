'use client'
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function RegisterPage(){
    const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')    
const [userCreated, setUserCreated] = useState(false);
const [error, setError] = useState(false)

async function handleFormSubmit(ev) {
    ev.preventDefault();
    
    try{
        const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if(res.ok){
        const form = ev.target;
        form.reset();
        console.log('User Created')
        setUserCreated(true);
    }else{
        console.log('User Registration Failed')
        setError(true)
    }
    }catch(err){
        console.log('Error during registration', err)
    }
  }

  
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User Created. You can <Link className="underline" href={'/login'}>Login</Link>
                </div>
            )}

            {error && (
                <div className="my-4 text-center">
                    User with this email is already created. Please try again with different email
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit} >
            <input type="text" placeholder="name"  value={name} onChange={ev => setName(ev.target.value)} disabled={userCreated}/>
                
                <input type="email" placeholder="email"  value={email} onChange={ev => setEmail(ev.target.value)} disabled={userCreated}/>
                <input type="password" placeholder="password"  value={password} onChange={ev => setPassword(ev.target.value)} disabled={userCreated}/>
                <button type="submit" disabled={userCreated} className="text-center border border-gray-100 rounded-full text-primary text-xl mb-4">Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with a provider
                </div>
                <button className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={"Google logo"} width={24} height={24}/>
                    Login with Google</button>
                    <div className="my-4 text-center text-gray-500">
                        Existing account? <Link href={'/login'}>Login</Link>
                    </div>
            </form>
        </section>
        
    )
}