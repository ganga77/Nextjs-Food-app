'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from '../../components/layout/EditableImage'

export default function Profile() {
    const session = useSession();
    const { status } = session;

console.log(session)

    const [userName, setUserName] = useState('');
    const [phone, setphone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('')
    const [admin, setIsAdmin] = useState(false)
    const [image, setImage] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            fetch('http://localhost:3000/api/profile').then(response => {
                response.json().then(data => {
                    setphone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin)
                    setImage(data.image)
                })
            })
        }

    }, [session, status])

    if (status === 'loading') {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
        return 'Cannot See profile. First Login'
    }

    

    async function handleProfileUpdate(ev) {
        ev.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/profile', {
                method: 'PUT',
                body: JSON.stringify({
                    name: userName,
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {

                console.log('User Updated')
                

            } else {
                console.log('User Updation Failed')

            }
        } catch (err) {
            console.log('Error during updation', err)
        }
    }



    
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
            {admin && (
                <UserTabs />
            )}
             <div className="flex gap-4 items-center"> 
            <div className="p-2 rounded-lg relative">
            <EditableImage link={image} setLink={setImage}/>
            
            </div>
            </div>
            <form className="max-w-ws mx-auto border" onSubmit={handleProfileUpdate}>
                <div>
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="First and Last Name" />
                    <input type="email" placeholder={session.data?.user?.email} disabled="true" />
                    <input type="tel" placeholder={"phone"} value={phone} onChange={ev => setphone(ev.target.value)} />
                    <input type="text" placeholder={"street Address"} value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                    <div className="flex gap-4">
                        <input type="text" placeholder={"Postal Code"} value={postalCode} onChange={ev => setPostalCode(ev.target.value)} />
                        <input type="text" placeholder={"City"} value={city} onChange={ev => setCity(ev.target.value)} />
                    </div>
                    <input type="text" placeholder={"country"} value={country} onChange={ev =>setCountry(ev.target.value)}/>
                    <button type="submit" className="bg-primary text-white rounded-full ">Submit</button>
                </div>
            </form>
        </section>
    )
}