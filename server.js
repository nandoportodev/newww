const express = require('express');
const bodyParser = require('body-parser');
const episRoutes = require('./routes/epis');
const colaboradoresRouter = require('./routes/colaboradores');
const retiradaDevolucaoRouter = require('./routes/retiradaDevolucao');


const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/epis', episRoutes);
app.use('/colaboradores', colaboradoresRouter);
app.use('/transacoes', retiradaDevolucaoRouter);

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
