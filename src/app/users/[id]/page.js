'use client'
import { useParams } from "next/navigation"

export default function EditUserPage(){
    const {id} = useParams();
    return (
        <hi>{id}</hi>
    )
}