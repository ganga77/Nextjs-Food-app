
import { User } from "@/models/User";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import { NextResponse } from "next/server";


export async function POST(req, res) {
    const {name, email, password} = await req.json();
    console.log(name)

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connection to MONGODB successful');
        const createdUser = await User.create({name,email, password});
        console.log(createdUser);
        return Response.json(createdUser);
        
    } catch (error) {
        return NextResponse.json(
            {message: "An Error occured while creating the user"},
            {status: 500}
        )
        
    }
}

