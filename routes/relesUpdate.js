var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/',  function(req, res) {
  const parametros = req.body;
  console.log('Parâmetros recebidos:', parametros);
  
  console.log('rele1:', req.body.rele1);

  let salva = {
    rele1:req.body.rele1,
    rele2:req.body.rele2,
    rele3:req.body.rele3,
    rele4:req.body.rele4,
    rele5:req.body.rele5,
  };


   const filePath = path.join(__dirname, 'reles.json');
  fs.writeFileSync(filePath, JSON.stringify(salva, null, 2), 'utf-8');

res.send("Reles Update");  
});

module.exports = router;
