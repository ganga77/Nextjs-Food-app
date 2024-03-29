import mongoose from "mongoose";
import {Order} from '../../../models/Order'


export async function GET(){
    return Response.json(
        await Order.find()
    )
}


