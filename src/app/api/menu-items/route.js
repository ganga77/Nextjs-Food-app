import {MenuItems} from '../../../models/MenuItems'
import mongoose from 'mongoose';
export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const {name, description, basePrice, image, model, year, color, driven, vin } = await req.json();
    console.log(`Image recieved Menu: ${image}`)
    const menuItemDoc = await MenuItems.create({name, description, basePrice, image, model, year, color, driven, vin})
    return Response.json(menuItemDoc)
}

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const {_id, ...data} = await req.json();
    const editItem = await MenuItems.findByIdAndUpdate(_id, data);
    return Response.json(editItem)

}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await MenuItems.find()
    )
}

export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL)
    const url = new URL(req.url)
    const id = url.searchParams.get('_id')
    const deletedMenuItem = await MenuItems.findByIdAndDelete(id)
    return Response.json(deletedMenuItem)
}