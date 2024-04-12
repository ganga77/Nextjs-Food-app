import {Order} from '../../../models/Order'
import mongoose from "mongoose";
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { name, email, phone, streetAddress, postalCode, city, country, 
        orderNames, 
         } = await req.json();
console.log(name, email, streetAddress, postalCode, city, country, 
    orderNames
    )
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connection to MONGODB successful');

        const orderSubmitted = await Order.create({name, email, phone, streetAddress, postalCode, city, country, 
            orderNames, 
            });
        console.log('Order Sumitted');
        return Response.json(orderSubmitted);

    } catch (error) {
        return NextResponse.json(
            { message: "An Error occurred while creating the order" },
            { status: 500 }
        )
    }
}


