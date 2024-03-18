import mongoose from "mongoose";
import { Category} from "../../../models/Category";

export async function POST(req){
    const {name} = await req.json();

    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc)
}

export async function PUT(req){
    const {_id, name} = await req.json();
  
    const editedCategory = await Category.updateOne({_id}, {name})
    return Response.json(editedCategory);
}
export async function GET(){
    return Response.json(
        await Category.find()
    )
}

export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL)
    const url = new URL(req.url)
    const id = url.searchParams.get('_id')
    const deletedCategory = await Category.findByIdAndDelete(id)
    return Response.json(deletedCategory)
}

