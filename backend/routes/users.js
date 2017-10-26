var express = require('express');
var request = require('request');
var router = express.Router();
var UserModel = require('../model/UserModel.js');





/* GET users listing. */
router.post('/login', function(req, res, next) {
    function getUserInfo(options, callback) {
        getOpenid(options, function(err, info) {
            if (err) {
                callback(err);
            } else {
                callback(err, info);
            }
        });
    }

    function getOpenid(options, callback) {
        var userInfo = {};
        var appid = "wxc4614e1d785b49dd";
        var secret = "cbc6ef1b21b8a5703128ca38e68fe7ca";
        // https://api.weixin.qq.com/sns/jscode2session?appid=wx0075a4b06539973f&secret=c41892d77ea156492b70750c43cf3c68&js_code=061cBaYG19Pyl60hZrYG1vdfYG1cBaYi&grant_type=authorization_code

        var wxUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + options.code + "&grant_type=authorization_code"
        request(wxUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var response = JSON.parse(body);

                if (response.errcode) {
                    callback({
                        code: response.errcode,
                        message: response.errmsg,
                    })
                } else {
                    console.log(response.openid);
                    userInfo.openid = response.openid;
                    userInfo.session_key = response.session_key;
                    userInfo.unionid = response.unionid;
                    console.log(userInfo);
                    callback(null, userInfo)
                }
            } else {
                callback({
                    code: -1,
                    message: "authorization failed",
                })

            }
        });

    }
    var code = req.body.code;
    getUserInfo({
        code: code
    }, function(err, info) {
        if (err) {
            res.send({
                code: -1,
                message: "获取用户登录态失败",
            });
        } else {
            console.log(info);
            UserModel.findOne({
                openid: info.openid
            }, function(err, userInfo) {
                if (userInfo) {
                    res.send({
                        code: 0,
                        message: "登录成功！",
                        data: userInfo,
                    })
                } else {
                    var entity = new UserModel({
                        type: 1,
                        openid: info.openid,
                        session_key: info.session_key,
                        unionid: info.unionid || "",
                    });
                    entity.save(function(err, user) {
                        if (err) {
                            res.send({
                                code: -1,
                                message: "获取用户登录态失败",
                            })
                        } else {
                            res.send({
                                code: 0,
                                message: "登录成功！",
                                data: user,
                            })
                        }
                    })

                }
            })
        }
    })
})


router.post('/update/:id', function(req, res, next) {


});







router.get('/list/:type', function(req, res, next) {
    if (req.query.username == "admin" && req.query.password == "amdin") {
        UserModel.find({}, {
            type: req.params.type,
        }, function(err, users) {
            res.send({
                code: 0,
                message: "获取成功！",
                data: uses,
            })
        })
    } else {
        res.send({
            code: -1,
            message: "用户名或者密码错误！",
        });
    }
});

module.exports = router;