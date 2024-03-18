import {Schema, model, models,} from 'mongoose'


const ExtraPriceSchema = new Schema({
    name: String,
    price: Number
});

const MenuItemsSchema = new Schema({
    name: {type:String, required: true},
    description: {type: String},
    basePrice: {type: Number},
    image: {type: String},
    sizes: {type: [ExtraPriceSchema]},
    extraIngredientsPrices :{type: [ExtraPriceSchema]}

}, {timestamps: true})


export const MenuItems = models?.MenuItems || model('MenuItems', MenuItemsSchema);