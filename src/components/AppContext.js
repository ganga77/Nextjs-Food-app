'use client'
import { SessionProvider } from "next-auth/react";

//This is the component for loggedin sessions
export default function AppContext({children}){
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}