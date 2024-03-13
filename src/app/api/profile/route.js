import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "../../../models/User"
import {UserInfo} from '../../../models/UserInfo'

export async function PUT(req) {


    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    console.log('Data is:')
    console.log(data)
    const {name, image, ...otherUserInfo} = data;
    const session = await getServerSession(authOptions)
    const email = session?.user?.email;


    
const update = {}

if('name' in data){
    update.name = data.name
}
if('image' in data){
   update.image = data.image 
}

if(Object.keys(update).length > 0){
    console.log('Update:')
    console.log(update)
    const user = await User.updateOne({ email }, update);
        console.log(user)
}
    
        
    
    

    //We will update other info like streetAddress, phone etc to userInfo table. upsert means if we don't find any record with email then it will insert that email and then will find
    await UserInfo.findOneAndUpdate({email}, otherUserInfo, {upsert:true});
    


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