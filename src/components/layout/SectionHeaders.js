export default function SectionHeaders({mainHeader, subHeader}){
    return (
        <div>
                <h3 className="uppercase text-gray-600 font-semibold leading-4">{mainHeader}</h3>
                <h2 className="text-primary font-bold text-4xl">{subHeader}</h2>
            </div>
    )
}