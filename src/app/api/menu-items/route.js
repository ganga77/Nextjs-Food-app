import {MenuItems} from '../../../models/MenuItems'
import mongoose from 'mongoose';
export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const {name, description, basePrice} = await req.json();
    const menuItemDoc = await MenuItems.create({name, description, basePrice})
    return Response.json(menuItemDoc)
}