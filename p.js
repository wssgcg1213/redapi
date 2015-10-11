/**
 * Created by Liuchenling on 9/17/14.
 */
var app = require('../redapi');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {'log level': 2});
var phantom = require('phantom');
var a;
io.on('connection', function (socket) {
    socket.on('query', function(data){
        console.log('received:', data);
    });
    a = socket;
});


phantom.create(function (ph) {
    ph.createPage(function (page) {
        page.open("http://i.xiaoi.com/", function (status) {
            if (status != 'success') {
                ph.exit();
                return console.log('can not open url!');
            }
            page.includeJs('http://hongyan.cqupt.edu.cn/cdn/js/396934_socket.io.min.js', function(){
                page.evaluate(function(){
                    var socket = io.connect('http://127.0.0.1:3000');
                    window.__webrobot_processMsg = function (v) {
                        socket.emit('query', v);
                        return v;
                    };
                    socket.on('connect', function(){});
                    socket.on('query', function(data){
                        $('#inputArea').val(data);
                        $('#inputButtonDiv').click();
                    });

                    //
                    setInterval(function(){
                        $('#inputArea').val('你是谁啊');
                        $('#inputButtonDiv').click();
                    }, 5000);
                    //
                    return $('.chat-segment').text();
                }, function (result) {
                    console.log(result);
                });
            });
        });
    });
});

//建立一个 ws 服务器来返回.

//(function getData() {
//    console.log('getting data.');
//    page.evaluate(function () {
//        return window.ROBOTMSG;
//    }, function (r) {
//        if(!r){
//            return setTimeout(getData, 50);
//        }
//        callback(null, r);
//        ph.exit();
//    });
//})();


module.exports = a;
a.emit('query', 'WC');