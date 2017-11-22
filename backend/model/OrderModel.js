const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    user:{
        id:String,
        name:String,
        headImg:String,
    },
    name:String,
    brand:String,
    note:String,
    buyPrice:String,
    sellPrice:String,

    orderNumber: String,
    descrption:String,
    imageUrls:String,
	creatAt: Date,
	updateAt: Date,
});
module.exports = exports = mongoose.model('Order', OrderSchema)