import {Schema, model, models,} from 'mongoose'

const MenuItemsSchema = new Schema({
    name: {type:String, required: true},
    description: {type: String},
    basePrice: {type: Number},
    image: {type: String}
}, {timestamps: true})


export const MenuItems = models?.MenuItems || model('MenuItems', MenuItemsSchema);