import {Schema, model, models,} from 'mongoose'

const MenuItemsSchema = new Schema({
    name: {type:String, required: true},
    description: {type: String},
    basePrice: {type: Number}
}, {timestamps: true})


export const MenuItems = models?.MenuItems || model('MenuItems', MenuItemsSchema);