/**
 * Created by Liuchenling on 9/11/14.
 * 从数据库获取课表，得到课时数量排名等信息，存储到/models/rank.json
 */


// var settings = require('../settings');
// var mongoose = require('mongoose');
// mongoose.connect(settings.db);

// var kebiaoModel = require('../models/kebiaoModel');
var fs = require('fs');
var data = require('../data.json');
var handledData = [];

for(var i in data){
    handledData.push(data[i]);
}

handledData.sort(function(a, b){
    return b.sum - a.sum;
});

var len = handledData.length;
handledData.forEach(function(self){
   self.beat = handledData.indexOf(self);
   self.ranking = Math.round(  (len - self.beat) / len * 10000  ) / 100 + '%';
});

var resultData = {};
handledData.forEach(function(self){
    resultData[self.stuNum] = self;
});


fs.writeFile('../models/rank.json', JSON.stringify(resultData), function (err) {
    if (err) throw err;
    console.log('rank.json saved in models');
    process.exit(0);
});