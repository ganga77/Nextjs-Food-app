import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "../../../models/User"

export async function PUT(req) {


    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    console.log(data)
    const session = await getServerSession(authOptions)
    const email = session.user.email;



    const user = await User.updateOne({ email }, data)
    console.log(user)


    return Response.json(true)
}

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    return Response.json(await User.findOne({ email }))
}