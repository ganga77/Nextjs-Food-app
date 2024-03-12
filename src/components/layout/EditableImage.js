import Image from "next/image";
export default function EditableImage({link, setLink}){
    async function handleFileChange(){
        const files = ev.target.files;
        if(files?.length == 1){
            const data = new FormData;
            data.set('file', files[0]);

            const uploadPromise = await fetch('http://localhost:300/api/upload', {
                method: 'POST',
                body: data,

            }).then(response =>{
                return response.json().then(link => {
                    setLink(link)
                })
            })
            throw new Error('Something went wrong')
        }


    }

    return (
        <>
        {link && (
            <Image className="rounded-lg w-full h-full mb-1" src={link} width={250}
            height={250} alt={'avatar'}/>
        )}
        <label>
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>

        </label>
        </>
    )
}