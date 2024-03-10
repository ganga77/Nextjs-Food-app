import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "../../../models/User"
import {UserInfo} from '../../../models/UserInfo'

export async function PUT(req) {


    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    console.log(data)
    const {name, ...otherUserInfo} = data;
    const session = await getServerSession(authOptions)
    const email = session?.user?.email;


    // We will only update the name in User table from the profile form
    const user = await User.updateOne({ email }, name)

    //We will update other info like streetAddress, phone etc to userInfo table. upsert means if we don't find any record with email then it will insert that email and then will find
    await UserInfo.findOneAndUpdate({email}, otherUserInfo, {upsert:true});
    console.log(user)


    return Response.json(true)
}

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if(!email){
        return Response.json({})
    }

    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({ email }).lean();
    return Response.json({...user, ...userInfo})
}