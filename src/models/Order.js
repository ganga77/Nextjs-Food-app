// Order.js
import mongoose from 'mongoose';
import { model, models, Schema } from 'mongoose';

const extraIngredientsSchema = new Schema({
    name: {type: String},
    price: {type: Number}
})

const orderNameSchema = new Schema({
    name: {type: String},
    size: {type: String},
    extraIngredients : {type: [extraIngredientsSchema]}

})
const OrderSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    orderNames : {type: [orderNameSchema]},
    totalPrice: {type: Number}
});

 export const Order = models?.Order || model('Order', OrderSchema);




