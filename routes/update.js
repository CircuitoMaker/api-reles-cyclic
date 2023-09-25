var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
//router.get('/?',  function(req, res, next) {
    router.post('/',  function(req, res, next) {

       //get 
// let temperatura = req.query.temperatura;
// let umidade     = req.query.umidade;

//post
let temperatura = req.body.temperatura;
let umidade     = req.body.umidade;
let api_key = req.body.api_key

console.log("TEMPERATURA = " + temperatura);
console.log("UMIDADE = " + umidade);
console.log("api_key" + api_key);

const salva={
temperatura:temperatura,
umidade:umidade,
api_key:api_key
}

 const filePath = path.join(__dirname, 'temperatureData.json');
 fs.writeFileSync(filePath, JSON.stringify(salva, null, 2), 'utf-8');

// filePath = path.join(__dirname, 'reles.json');
// const data = fs.readFileSync(filePath, 'utf-8');
// let reles = JSON.parse(data);

let sts = {
    rele1:1,
    rele2:1,
    rele3:1,
    rele4:1,
    rele5:1
}

//res.send("dados recebidos no arduino " + temperatura);
res.send(sts);


 // res.render('update', { temperatura: temp});
});

module.exports = router;
