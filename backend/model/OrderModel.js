const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    orderNumber: String,
    descrption:String,
    imageUrls:String,
	creatAt: Date,
	updateAt: Date,
});
module.exports = exports = mongoose.model('Order', OrderSchema)