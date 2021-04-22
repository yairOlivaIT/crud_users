const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        trim: true,
        unique: true,
    },
    rol:{
        type: String,
        trim: true,
    },
    age:{
        type: String,
        trim: true,
    },
    country:{
        type: String,
        trim: true,
    }
});

//Para sustituir el _id por id y para sacar el __v
// userSchema.set('toJSON', {
//     transform: (document , returnedObject) => {
//         returnedObject.id = returnedObject._id
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

module.exports = mongoose.model('User',userSchema);