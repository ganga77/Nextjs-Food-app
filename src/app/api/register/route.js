import { User } from "../../../models/User"
import mongoose from "mongoose";
import bcrypt from 'bcrypt'; // Import the bcrypt library
import dotenv from 'dotenv';
dotenv.config();
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const { name, email, password } = await req.json();

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connection to MONGODB successful');

        if (!password?.length || password.length < 5) {
            throw new Error('Password must be at least 5 characters');
        }

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const createdUser = await User.create({ name, email, password: hashedPassword });
        console.log(createdUser);
        return Response.json(createdUser);

    } catch (error) {
        return NextResponse.json(
            { message: "An Error occurred while creating the user" },
            { status: 500 }
        )
    }
}
