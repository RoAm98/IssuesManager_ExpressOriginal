var express = require('express');
var router = express.Router();
var conn = require('../dbconn/connect')

/* GET techs page. */
router.get('/', function (req, res, next) {
  res.render('issues');
});

router.post("/saveissues", function (req, res) {
  let form = req.body;
  let cmd = 'INSERT INTO problems SET ?';
  conn.query(cmd, form, (err, result) => {
    if (err) throw err;
    res.end();
  });
})

router.get('/issuelist', function (req, res, next) {
  res.render('issuelist');
});

router.get("/listissues", function (req, res) {
  let cmd = "SELECT concat(fname, ' ' , lname) AS Fullname, problems.* FROM technicians INNER JOIN problems ON technicians.techID = problems.techID";
  conn.query(cmd, (err, result) => {
    if (err) throw err;
    res.writeHead(200, { 'content-type': 'json' });
    res.write(JSON.stringify(result));
    res.end();
  });
})

router.delete("/deleteissue/:issueID", function (req, res) {
  let issueID = req.params.issueID;
  let cmd = 'DELETE FROM problems WHERE issueID = ?';
  conn.query(cmd, issueID, (err, result) => {
    if (err) throw err;
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end();
  });
})

router.put("/updateissue/:issueID", function (req, res) {
  let issueID = req.params.issueID;
  let form = req.body;
  let cmd = 'UPDATE problems SET ? WHERE issueID = ?';
  conn.query(cmd, [form, issueID], (err, result) => {
    if (err) throw err;
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end();
  });
})

module.exports = router;