import SectionHeaders from "./SectionHeaders"
import MenuItem from "./menu/MenuItem"
export default function HomeMenu(){
    return (
        <section className="">
            <div className="text-center">
            <SectionHeaders mainHeader={"Checkout"} subHeader={"Menu"}/>
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </div>
        </section>
    )
}