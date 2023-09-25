var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/',  function(req, res, next) {

 filePath = path.join(__dirname, 'temperatureData.json');
 const data = fs.readFileSync(filePath, 'utf-8');
 let dados = JSON.parse(data);

 let temperatura = dados.temperatura
 console.log("temp " + temperatura);

 let umid = dados.umidade
 console.log("umid " + umid);

 let key = dados.api_key
 console.log("api_key " + key);


//res.send("ver");
  res.render('ver', {temperatura, umid, key});
  
});

module.exports = router;
