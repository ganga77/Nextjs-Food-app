'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";

import Image from "next/image";
export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loginInProgress, setLoginInProgress] = useState(false)

    async function handleFormSubmit(ev){
        ev.preventDefault();
    
    

    await signIn('credentials', {email, password}) // this will go to api/auth
    setLoginInProgress(true);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
            

           
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit} >
                <input type="email" placeholder="email"  value={email} onChange={ev => setEmail(ev.target.value)} disabled={loginInProgress}/>
                <input type="password" placeholder="password"  value={password} onChange={ev => setPassword(ev.target.value)} disabled={loginInProgress}/>
                <button type="submit" disabled={loginInProgress} className="text-center border border-gray-100 rounded-full text-primary text-xl mb-4">Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login with a provider
                </div>
                <button onClick={()=>signIn('google', {redirect:'/'})}
                className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={"Google logo"} width={24} height={24}/>
                    Login with Google</button>
                   
            </form>
        </section>
    )
}