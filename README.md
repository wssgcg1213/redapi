#重邮小帮手 Andriod Api | 2014-07-28修订
##修订日志
####2014-07-28:
> 修改个人账号验证接口成功后返回[学号 姓名 性别 班级 专业 院系 年级]

> 成功状态统一为：200

> 修改文档中补考查询为有补考状态的返回

> bugfix 一坨


##公共部分:
####请求:
> API 的访问允许 IP range 为 0.0.0.0, 请求方式为`HTTP POST`方式, 参数以`URLencoded`方式封装

####返回数据:
> API 的数据返回格式统一采用`JSON`格式, 公共参数有`status`, `info`, `version`.

> `status` 表示请求响应的状态, 非负数表示正常返回, 异常返回为负数.

> `info` 简要叙述返回状态信息.

> `version` 当前 API 的版本.

##APIs
###个人课表查询
#####地址:
> http://hongyan.cqupt.edu.cn/api/kebiao

#####参数列表: 
> <必须> `stuNum`: 学号, eg: 2013214368
> 
> <可选> `week`: 周数, eg: 19 <默认:当前周>

#####返回格式:
```
{
    "status": 0,
    "week": 19,
    "info": "success",
    "data": [
        {
            "student": "2013214368",
            "course": "综合英语2",
            "teacher": "伍喆",
            "classroom": "4301",
            "begin_lesson": "1",
            "end_lesson": "2",
            "begin_week": "1",
            "end_week": "17",
            "weekday": "1",
            "property": "必修",
            "status": "正常",
            "term": "20132"
        }]
}

```

###教室课表查询
#####地址:
> http://hongyan.cqupt.edu.cn/api/roomkebiao

#####参数列表: 
> <必须> `roomNum`: 教室, eg: 2206

#####返回格式:
```
{
    "status": 200,
    "info": "Success",
    "term": "2013-2014学年2学期",
    "room": "2206",
    "data": [
        {
            "course": "Excel财务应用",
            "teacher": "刘曜",
            "classroom": "2206",
            "begin_lesson": 1,
            "end_lesson": 2,
            "begin_week": 2,
            "end_week": 20,
            "weekday": 1,
            "status": "正常",
            "term": "2013-2014学年2学期"
        }]
}

```

###个人账号验证
#####地址:
> http://hongyan.cqupt.edu.cn/api/verify

#####参数列表: 
> <必须> `stuNum`: 学号, eg: 2013214368
> 
> <必须> `idNum`: 密码, eg: xxxxxx

#####返回格式:
```
{
    "status": 200,
    "info": "success",
    "version": "0.0.2",
    "data": {
        "stuNum": "2013211470",
        "idNum": "xxxxxx",
        "name": "朱晨曦",
        "sex": "男",
        "classNum": "0401302",
        "profess": "计算机与智能科学类",
        "college": "计算机科学与技术学院",
        "grade": "2013"
    }
}

```

###空教室查询
#####地址:
> http://hongyan.cqupt.edu.cn/api/roomEmpty

#####参数列表: 
> <可选> `weekdayNum`: 星期数, 从 1-7 表示星期一到星期日, eg: 5 <默认:当日星期数>
>
> <可选> `sectionNum`: 上课节数, hash表, 0表示12节, 1表示34节, 2表示56节, 3表示78节, 4表示910节, 5表示1011节 eg: 0  <默认:0>
>
> <可选> `buildNum`: 教学楼号, 0表示全部, 1-7 表示某教学楼, S表示信科, T表示图书馆. eg: 2 <默认:0>
> 
> <可选> `week`: 周数, eg: 19 <默认:当前周>

#####返回格式:

```
{
    "status": 200,
    "info": "Success",
    "data": [
        "2100",
        "游泳池2",
        "羽毛球场"
    ],
    "version": "0.0.1"
}

```

###考试成绩查询
#####地址:
> http://hongyan.cqupt.edu.cn/api/examGrade

#####参数列表: 
> <必须> `stuNum`: 学号, eg: 2013214368
> 
> <必须> `idNum`: 密码, eg: xxxxxx

#####返回格式:
```
{
    "status": 200,
    "term": "20132",
    "info": "success",
    "data": [
        {
            "student": "2013214368",
            "course": "电装实习",
            "grade": "B",
            "property": "实践环节",
            "status": "正常考试",
            "term": "20132"
        }]
}

```

###考试补考查询
#####地址:
> http://hongyan.cqupt.edu.cn/api/examReexam

#####参数列表: 
> <必须> `stuNum`: 学号, eg: 2013211470
> 
> <必须> `idNum`: 密码, eg: xxxxxx

#####返回格式:
```
{
    "status": 200,
    "term": "20132",
    "info": "success",
    "data": [
        {
            "student": "2013211470",
            "course": "大学英语2(视听说)",
            "classroom": "1",
            "seat": "6",
            "date": "0",
            "time": "0",
            "term": "20132"
        }
    ]
}

```

###考试安排查询
#####地址:
> http://hongyan.cqupt.edu.cn/api/examSchedule

#####参数列表: 
> <必须> `stuNum`: 学号, eg: 2013214368
> 
> <必须> `idNum`: 密码, eg: xxxxxx

#####返回格式:
```
{
    "status": 200,
    "term": "20132",
    "info": "success",
    "data": [
        {
            "student": "2013214368",
            "course": "电路分析基础",
            "classroom": "3108",
            "seat": "15",
            "week": "17",
            "weekday": "6",
            "begin_time": "10:10",
            "end_time": "12:10",
            "status": "待定",
            "term": "20132"
        }]
}

```

###教务新闻列表
#####说明:
> 每次返回15条

#####地址:
> http://hongyan.cqupt.edu.cn/api/jwNewsList

#####参数列表: 
> <可选> `page`: 页数, eg: 2 <默认:1>

#####返回格式:
```
{
    "status": 200,
    "info": "Success",
    "page": 1,
    "data": [
        {
            "id": "64e5dcccae516793d9bd17e982d26aad85e6e81b",
            "content": "2013-2014学年第二学期补考工作安排通知.",
            "date": "07/11/2014                    ",
            "read": "636"
        }]
}

```

###教务新闻内容
#####地址:
> http://hongyan.cqupt.edu.cn/api/jwNewsContent

#####参数列表: 
> <必须> `id`: 新闻 ID 号, eg: 64e5dcccae516793d9bd17e982d26aad85e6e81b

#####返回格式:
```
{
    "status": 200,
    "info": "Success",
    "id": "64e5dcccae516793d9bd17e982d26aad85e6e81b",
    "data": {
        "title": "2013-2014学年第二学期补考工作安排通知.",
        "content": "\r\n\r\n各单位：\r\n\r\n2013～2014学年第二学期补考工作定于2014年9月4日～6日进行，为确保补考工作的顺利进行，现将有关事项通知如下：\r\n\r\n1．各课程补考已安排完毕，教学单位和教师请通过教务在线的教学管理和教师服务（或公共服务）查询，学生可通过教务在线的学生服务查询。\r\n\r\n2．考试安排已解决学生可能出现的考试冲突，请各课程承担单位遵照执行，未经教务处同意，不得擅自更改考试时间和地点。\r\n\r\n3．请各学院于9月3日上午12:00前落实各课程监考教师，主监考由课程承担单位派出，通过教务在线上报；副监考由教务处根据考试安排分配(副监考安排表附后)，相关学院通过校务信息电子邮件报送给崔屏。\r\n\r\n4．补考试卷由教务处教学运行科集中印制，请各学院于9月3日上午到四教二楼教学运行科领取试卷，各考试课程教师应于考前一天到课程所属学院领取并检查试卷，试卷领出后应注意试卷的安全保密工作。\r\n\r\n5．补考课程由课程承担教学部负责组织阅卷及成绩报送，成绩报送时间截止至2014年9月11日（新学期第一周周四）下午17:00。\r\n\r\n6．本次考试不发放补考学生准考证，参考学生名单由课程承担单位通过教务在线下载，再由主监考将学生名单带到考场，请各教学单位负责组织学生参考，落实监考教师，组织辅导员巡考。\r\n\r\n7．请各教学单位做好相关考试资料的归档工作。\r\n\r\n8．请物业管理中心在补考期间2014年9月4日～6日，将信令设置为：\r\n\r\n\r\n上午7:50－9:50时（7:40预备铃）\r\n\r\n上午10:10－12:10时（10:00预备铃）\r\n\r\n下午1:50－3:50时（1:40预备铃）\r\n\r\n下午4:10－6:10时（4:00预备铃）\r\n\r\n晚上7:30－9:30时（7:20预备铃）\r\n\r\n9．请物业管理中心于2014年9月3日前，完成三教、五教考场的照明、桌椅等检修工作和考场清洁工作。\r\n\r\n10．请能源中心保证补考期间2014年9月3日～6日三教、五教的正常供电，以确保考试顺利进行。\r\n\r\n11．关于补考时段说明\r\n\r\n补考时段要求同期末考试，现具体说明如下:\r\n\r\n(1)时段的第一位表示星期，第二三位表示节次，如412表示星期四的一二节。\r\n\r\n(2)节次表示的具体时间：\r\n\r\n\r\n\r\n\r\n \r\n  \r\n  节次\r\n  \r\n  \r\n  时间\r\n  \r\n \r\n \r\n  \r\n  12\r\n  \r\n  \r\n  7:50～9:50\r\n  \r\n \r\n \r\n  \r\n  34\r\n  \r\n  \r\n  10:10～12:10\r\n  \r\n \r\n \r\n  \r\n  56\r\n  \r\n  \r\n  13:50～15:50\r\n  \r\n \r\n \r\n  \r\n  78\r\n  \r\n  \r\n  16:10～18:10\r\n  \r\n \r\n \r\n  \r\n  90\r\n  \r\n  \r\n  19:30～21:30\r\n  \r\n \r\n\r\n\r\n\r\n\r\n\r\n\r\n 教务处教学运行科\r\n\r\n 2014年7月11日\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n附：2013-2014学年第二学期副监考安排表\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"
    },
    "version": "0.0.1"
}

```
##错误代码
> API 的 `status` 表示响应状态, 当其为负数时, 表示该次 API 请求出现了错误.

> `-1`: 内部错误.

> `-10`: 教务在线返回的数据不合常理...

> `-20`: 传入的参数不合法.




##About

[ZeroLing](http://www.zeroling.com)

Contact: i@zeroling.com

