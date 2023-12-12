const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    createdat: {type: Date, required: false, default: Date.now},
    createdby: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    updatedat: {type: Date, required: false},
    updatedby: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    code: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    description: {type: String},
    stock: {type: Number, required: true},
    price: {type: Number, required: true}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;