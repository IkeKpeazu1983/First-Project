const mongoose = require('mongoose');
const {Schema} = mongoose;
const postSchema =  new Schema({
    title: {
        type: String
    },
    content: {
        type: String  
    },
    file: {
        type: String
    }
}),

  { timestamps: true});

const post = mongoose.model('post', postshema)
module.exports = post;