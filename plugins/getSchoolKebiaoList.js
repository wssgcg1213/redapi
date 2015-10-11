/**
 * Created by Liuchenling on 10/1/14.
 */

var personalKebiaoModel = require('../models/personalKebiaoModel');
var verify = require('./verify').rawCall;

function main(callback){
    personalKebiaoModel


}

function wrapReturnData(options, data){
    return {
        status: options.status || 200,
        info:  options.info || "success",
        stuNum: options.stuNum || 0,
        idNum: options.idNum || 0,
        data: data || []
    };
}

function getSchoolKebiaoList(req, res){
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var xh = req.body['stuNum'];
    var pwd = req.body['idNum'];

    verify(xh, pwd, funciton(err, data){
        if(err || data.status !== 200){
            return res.end(JSON.stringify({status: -100, info: 'auth error'}));
        }else{
            main(function(err, data){
                if(err){
                    console.log(err);
                    return res.json({status: -200, info: 'server inner error'}).end();
                }else {
                    return res.json(data).end();
                }
            });
        }
    });


}

googleMain.type = 'post';
module.exports = getSchoolKebiaoList;