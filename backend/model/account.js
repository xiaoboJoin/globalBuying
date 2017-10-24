const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
	name: String,
	mobile: String,
	email: String,
	creatAt: Date,
	updateAt: Date,
	token: String,
	wechat: {
		code: String,
		state: String,
		lang: String,
		country: String,
		access_token: String,
		expires_in: Number,
		refresh_token: String,
		openid: String,
		scope: String,
		unionid: String,
		openid: String,
		nickname: String,
		sex: Number,
		province: String,
		city: String,
		country: String,
		headimgurl: String,
		privilege: Array,
	}
});



module.exports = exports = mongoose.model('User', UserSchema)