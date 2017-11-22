const mongoose = require('mongoose');
const ProductionSchema = new mongoose.Schema({
    user: {
        id: String,
        name: String,
        headImg: String,
    },
    product: {
        name: String,
        brand: String,
        note: String,
        buyPrice: String,
        sellPrice: String,
    },
    creatAt: Date,
    updateAt: Date,
});
module.exports = exports = mongoose.model('Production', ProductionSchema)