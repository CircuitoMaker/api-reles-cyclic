var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.post('/',  function(req, res, next) {

 filePath = path.join(__dirname, 'reles.json');
 const data = fs.readFileSync(filePath, 'utf-8');
 let reles = JSON.parse(data);

//console.log(reles)
res.send(reles);
});

module.exports = router;
