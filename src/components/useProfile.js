import { useState, useEffect } from "react"
export default function useProfile(){
    const [data, setData] = useState('')
    const [loading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        fetch('http://localhost:3000/api/profile').then(response =>{
            response.json().then(data =>{
                setData(data)
                setIsLoading(false)
            })
        })

    }, [])

    return {data, loading}
}