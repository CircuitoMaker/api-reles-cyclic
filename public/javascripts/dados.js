const fs = require('fs');
const path = require('path');

// Função para ler os dados do arquivo JSON
function readTemperatureData() {
    const filePath = path.join(__dirname, 'temperatureData.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  
  // Função para escrever os dados no arquivo JSON
  function writeTemperatureData(data) {
    const filePath = path.join(__dirname, 'temperatureData.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }