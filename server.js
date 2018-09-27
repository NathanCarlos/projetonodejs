const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //criação de uma nova instância do express

app.use(bodyParser.json());
//Importando app.
// require('./src/routes/index')(app);



// app.listen(3000, () => {
//   console.log('App de exemplo executando na porta 3000');
// });

//Colocar porta 3000 do node.
const setupApp = require('./src/app');
const port = 3000;
setupApp()
  .then(app => app.listen(port, () => console.log(`App rodando na porta ${port}`)))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });