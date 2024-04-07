import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;



const MenuItemsSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: Number },
    image: { type: String },
    model: {type: String},
    year: {type: String},
    driven: {type: String},
    vin: {type: String},
    color: {type: String}

}, { timestamps: true });

export const MenuItems = models?.MenuItems || model('MenuItems', MenuItemsSchema);
