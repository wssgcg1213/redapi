var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var moment = require('moment'); //for format date
var uuid = require('uuid'); //for create uuid v4

var TERM_START = new Date(2015, 2, 2, 8); //开学第一周的星期一的日子，年，月，日，第二个参数0表示一月份。最后一个表示8点
						//2015年3月2日.
var data = []; //global
var tool = {};
tool.format = function(date){
	return moment(date).format("YYYYMMDDTHHmmss");
};
tool.now = function(){
	return this.format(new Date());
};
tool.formatZ = function(date){
	return moment(date).format("YYYYMMDDTHHmmss") + 'Z';
};

function getBeginData(calName, color){
	calName = calName || '红岩课程表';
	color = color || '#9933CC';
	data = [];
	data = data.concat([
		"BEGIN:VCALENDAR",
		"CALSCALE:GREGORIAN",
		"VERSION:2.0",
		"METHOD:PUBLISH",
		"X-WR-CALNAME:" + calName,
		"X-WR-TIMEZONE:Asia/Shanghai",
		"X-APPLE-CALENDAR-COLOR:" + color
	]);
}

function getBodyData(kebiaoData){
	var _data = [];

	function formatVEVENT(start, end, _class){
		//start, end are Date Objects
		var ret = [
			"BEGIN:VEVENT",
			"TRANSP:OPAQUE",
			"CREATED:" + tool.formatZ(new Date()),
			"UID:" + uuid.v4(),
			"DTEND;TZID=Asia/Shanghai:" + tool.format(end),
			"TRANSP:OPAQUE",
			"LOCATION:@" + _class.classroom,
			"SUMMARY:" + _class.course,
			"DESCRIPTION:" + [_class.teacher, _class.rawWeek, _class.type].join(', '),
			"URL;VALUE=URI:http://hongyan.cqupt.edu.cn/#AuthoredByLing",
			"DTSTART;TZID=Asia/Shanghai:" + tool.format(start),
			"DTSTAMP:" + tool.formatZ(new Date()),
			"SEQUENCE:0",
			"END:VEVENT"
		];
		return ret.join("\r\n");
	}

	kebiaoData.forEach(function(_class){
		_class.week.forEach(function(_week){
			var start = moment(TERM_START).add(_week - 1, 'w').add(_class.hash_day, 'd');

			if(
				start.isBetween('2015-03-02 00:00:00','2015-03-03 23:59:59') ||  //报到
				start.isBetween('2015-04-04 00:00:00','2015-04-06 23:59:59') ||  //清明
				start.isBetween('2015-04-16 00:00:00','2015-04-17 23:59:59') ||  //校运会
				start.isBetween('2015-05-01 00:00:00','2015-05-03 23:59:59') ||  //51
				start.isBetween('2015-06-20 00:00:00','2015-06-22 23:59:59')   //端午节
				){
				return;
			}//过滤不上课的日子

			if(typeof _class.course === 'string' && _class.course.indexOf('Mooc') > -1){
				return;
			}//过滤慕课课程

			switch(_class.hash_lesson){
				case 0:
					break;
				case 1:
					start.add(2, 'h').add(5, 'm'); //10:05
					break;
				case 2:
					start.add(6, 'h'); //14:00
					break;
				case 3:
					start.add(8, 'h').add(5, 'm'); //16:05
					break;
				case 4:
					start.add(11, 'h'); //19:00
					break;
				case 5:
					start.add(13, 'h').add(5, 'm'); //21:05
					break;
			}
			var end = moment(start);
			end.add({hours:1, minutes:45}); //上课1小时45分后下课
			_data.push(formatVEVENT(start, end, _class));
		});
	});

	data = data.concat(_data);
}

function getEndData(){
	data.push('END:VCALENDAR');
}

function structData(rawObj){
	if(!rawObj.data || !rawObj.data.length) return console.log('no data');
	getBeginData();
	getBodyData(rawObj.data);
	getEndData();
	return data.join("\r\n");
}

function main(Mreq, Mres){
	Mres.setHeader('Content-Type', 'text/calendar');
	var xh = Mreq.query['xh'];
	if(!xh){
		Mres.end();
	}
	(function(){
		var postData = querystring.stringify({
  			'stu_num': xh
		});
		var req = http.request({
			host: "hongyan.cqupt.edu.cn",
			path: "/api/kebiao",
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': postData.length
			}
		}, function(res){
			res.setEncoding('utf8');
			var d = new Buffer([]);
			res.on('data', function(chunk){
				d += chunk;
			});
			res.on('end', function(){
				var out = structData(JSON.parse(d));
				Mres.end(out);
			});
		});
		req.write(postData);
		req.end();
	})();
}

main.type = "get";
module.exports = main;