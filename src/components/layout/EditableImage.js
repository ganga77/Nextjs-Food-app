import { set } from "mongoose";
import Image from "next/image";

export default function EditableImage({link, setLink}){
    async function handleFileChange(ev){
        
        const files = ev.target.files;
        if(files?.length === 1){
            const data = new FormData;
            data.set('file', files[0]);

            const res = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: data,

            })

            if (res.ok) {

                const link = await res.json();
                setLink(link)
                

            } else {
                console.log('Image Updation Failed')

            }
           
        }


    }

    return (
        <>
        {link && (
                <Image className="rounded-lg w-full h-full mb-1" src={link} alt={'user image'} width={250}
                height={250} />
            )}
            {!link && (
                <div>Choose a pic</div>
            )}
        
        <label>
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>

        </label>
        </>
    )
}

