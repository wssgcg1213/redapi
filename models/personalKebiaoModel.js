/**
 * Created by Liuchenling on 10/1/14.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var _Class = new Schema({
    lesson_id: Number,
    hash_day: Number,
    hash_lesson: Number,
    begin_lesson: Number,
    day: String,
    lesson: String,
    course: String,
    teacher: String,
    classroom: String,
    rawWeek: String,
    weekModel: String,
    weekBegin: Number,
    weekEnd: Number,
    week: [Number],
    type: String,
    status: String,
    period: Number,
    addTimestamp: Number
});

var Kb = new Schema({
    stuNum: Number,
    status: Number,
    info: String,
    term: String,
    version: String,
    data: [_Class]
});

module.exports = mongoose.model('personalKebiao', Kb);

