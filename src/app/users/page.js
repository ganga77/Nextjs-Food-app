'use client'
import UserTabs from "@/components/layout/UserTabs"
import useProfile from '../../components/useProfile'
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Users(){

    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/api/users').then(response =>{
            response.json().then(data =>{
                setUsers(data)
            })
        })
    }, [])

    const {data, loading} = useProfile();

    if(loading){
        return 'Loading user info...'
    }

    if(!data.admin){
        return 'Not an admin...'
    }
    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs />
            <div className="mt-8">
                {users?.length > 0 && users.map(user=> (
                    <div className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="flex grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-gray-500">
                            <span>{user.name}</span>
                            </div>
                            <span>{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/'+user._id}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}