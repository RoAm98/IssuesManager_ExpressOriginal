var express = require('express');
var router = express.Router();
var conn = require('../dbconn/connect')

/* GET techs page. */
router.get('/', function(req, res, next) {
  res.render('techs');
});

router.post("/savetechs", function(req, res){
  let form = req.body;
  let cmd = 'INSERT INTO technicians SET ?';
        conn.query(cmd, form, (err, result) => {
            if (err) throw err;
            res.end();
        });
})

router.get('/techlist', function(req, res, next) {
  res.render('techlist');
});

router.get("/listtechs", function (req, res) {
  let cmd = 'SELECT * FROM technicians';
  conn.query(cmd, (err, result) => {
    if (err) throw err;
    res.writeHead(200, { 'content-type': 'json' });
    res.write(JSON.stringify(result));
    res.end();
  });
})

router.delete("/deletetech/:techID", function (req, res) {
  let techID = req.params.techID;
  let cmd = 'DELETE FROM technicians WHERE techID = ?';
  conn.query(cmd, techID, (err, result) => {
    if (err) throw err;
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end();
});
})

router.put("/updatetech/:techID", function (req, res) {
  let techID = req.params.techID;
  let form = req.body;
  let cmd = 'UPDATE technicians SET ? WHERE techID = ?';
  conn.query(cmd, [form, techID], (err, result) => {
    if (err) throw err;
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end();
});
})

module.exports = router;
