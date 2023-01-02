var express = require('express');
var router = express.Router();
const async = require("async");
const stats = require("../models/data")
const lineScript = require("../private/lineScript.js");
const pieScript = require("../private/pieScript.js");
/* GET home page. */
router.get('/', async function(req, res, next) {

  let lineTopDay = await stats.find().sort({"messages.userMsgCount": -1 }).limit(1)
  let data = await stats.find().sort({_id: -1})

  res.render('index', { 
    
    //DATA FOR LINE CHART
    weekUserDataLine: lineScript.weekDataLine(data, "user"),
    weekBotDataLine: lineScript.weekDataLine(data, "bot"),
    weekLabelLine: lineScript.weekLabelLine(data),
    yearUserDataLine: lineScript.yearDataLine(data, "userMsgCount"),
    yearBotDataLine: lineScript.yearDataLine(data, "bot"),
    yearLabelLine: lineScript.yearLabelLine(),
    //DATA FOR LINE PARAGRAPH
    lineDate: lineTopDay[0]._date,
    lineCount: lineTopDay[0].messages.userMsgCount,  

    //DATA FOR PIE CHART
    todayDataPie: pieScript.todayDataPie(data),
    todayLabelPie: pieScript.todayLabelPie(data),
    weekDataPie: pieScript.weekOrMonthDataPie(data, 7),
    weekLabelPie: pieScript.weekOrMonthLabelPie(data, 7),
    monthDataPie: pieScript.weekOrMonthDataPie(data, 31),
    monthLabelPie: pieScript.weekOrMonthLabelPie(data, 31),
    //DATA FOR PIE CHART
    pieToday: data[0]._date,
    pieWeekAgo: data[6]._date,
    pieMonthAgo: data[30]._date,
    pieUserCountWeek: pieScript.weekOrMonthParagraphPie(data, 7),
    pieUserCountMonth: pieScript.weekOrMonthParagraphPie(data, 31),

  });
});

module.exports = router;
