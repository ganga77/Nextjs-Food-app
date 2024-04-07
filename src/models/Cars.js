import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;


const CarItemSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String },
    year: { type: Number },
    image: { type: String },
    color: {type: String},
    driven: {type: Number},
    vin: {type: String},
    price: {type: Number},

}, { timestamps: true });

export const Cars = models?.Cars || model('Cars', CarItemSchema);
