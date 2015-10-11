var version = '0.0.2';

function main(xh, week, callback) {
    var api_app = 'android';
    var api_token = '0zLUZA0j+OL77OsjXC0ulOz50KaI6yANZtkOk2vQIDg=';
    var path = week ? "/cyxbs/api/kebiao/" + xh + "/" + week : "/cyxbs/api/kebiao/" + xh;
    var req;
    req = require('http').request({
        host: "hongyan.cqupt.edu.cn",
        path: path,
        method: 'GET',
        headers: {
            'api_app': api_app,
            'api_token': api_token,
            'Accept': 'text/html'
        }
    }, function (res) {
        res.setEncoding('utf8');
        var data;
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            data = data.toString().substr(9);
            var jsonData = JSON.parse(data);
            if (jsonData.status == 0)
                jsonData.status = 200;
            jsonData.version = version;
            callback && callback(null, jsonData);
        });
    });
    req.end();
}

function kebiao(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var rawStuNum;
    rawStuNum = req.body['stu_num'] || req.body['stuNum'];
    var xh = rawStuNum;
    var week = parseInt(req.body['week']);
    main(xh, week, function(err, data) {
        if (err) return console.log(err);
        data.stuNum = xh;
        data.week = week;
        res.end(JSON.stringify(data));
    });
}

kebiao.type = 'post';
module.exports = kebiao;