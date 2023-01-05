const mongoose = require("mongoose");
const { Schema } = mongoose;

// const userSchema = new Schema({
//     "firstName": { type: String, required: true },
//     "lastName": { type: String, required: true },
//     "email": { type: String, required: true },
//     "password": { type: String, required: true },
//     "phoneNumber": [Number]
// });

const userSchema = new Schema({
    "user_nickname": { type: String, required: true, unique : true },
    "email": { type: String, required: true, unique : true},
    "password": { type: String, required: true },
    //"isVerified": { type: Boolean, required: true },
    "user_score": { type: Number, required: true },
    "user_registrationdate": { type: Date, required: true },
    "user_avatar": {type: String}, 
    "user_credits": {type: Number, required: true}, 
    "tower2": { type: Boolean, required: true, default: false},
    "tower3": { type: Boolean, required: true, default: false},
    "tower4": { type: Boolean, required: true, default: false},
    "tower5": { type: Boolean, required: true, default: false }
});

/*
 const shopItemSchema = new Schema({
    "item_name": { type: Number, required: true },
    "item_description": { type: String, required: true },
    "item_price": { type: Number, required: true },
    "item_model": {type: String, required: true}
});
 */
const User = mongoose.model('User' , userSchema);

module.exports = User;

