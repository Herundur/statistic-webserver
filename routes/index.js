var express = require('express');
var router = express.Router();
const async = require("async");
const stats = require("../models/data")

/* GET home page. */
router.get('/', async function(req, res, next) {

  let lineTopDay = await stats.find().sort({"messages.userMsgCount": -1 }).limit(1)
  let monthDataDB = await stats.find().sort({_id: -1})

  res.render('index', { 
    data: monthDataDB,
    lineDate: lineTopDay[0]._date,
    lineCount: lineTopDay[0].messages.userMsgCount,  
  });
});

module.exports = router;
