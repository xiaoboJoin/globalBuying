const mongoose = require('mongoose');
var crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    type:Number, //0,管理者，1，用户，2，代购人员
    mobile: String,
    email: String,
    creatAt: Date,
    updateAt: Date,
    token: String,
    openid:String,
    unionid: String,
    session_key:String,
    wechat: {
        state: String,
        lang: String,
        country: String,
        access_token: String,
        expires_in: Number,
        refresh_token: String,
        scope: String,
        nickname: String,
        sex: Number,
        province: String,
        city: String,
        country: String,
        headimgurl: String,
        privilege: Array,
    }
});

UserSchema.pre("save",function(next){
    this.token = crypto.createHash('md5').update(this.openid+"akdjslkfjsd").digest('hex');
    next();
})

module.exports = exports = mongoose.model('User', UserSchema)