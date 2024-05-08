const express = require('express');
const router = express.Router();
const retiradaDevolucaoController = require('../controllers/retiradaDevolucaoController');


router.get('/listar', retiradaDevolucaoController.listarTransacoes);
router.post('/retirada', retiradaDevolucaoController.registrarRetirada);
router.post('/devolucao', retiradaDevolucaoController.registrarDevolucao);

module.exports = router;
