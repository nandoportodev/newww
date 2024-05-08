const express = require('express');
const router = express.Router();
const colaboradoresController = require('../controllers/colaboradoresController');


router.post('/', colaboradoresController.cadastrarColaborador);
router.get('/listar', colaboradoresController.listarColaboradores);
router.delete('/:id', colaboradoresController.removerColaborador);
router.put('/:id', colaboradoresController.editarColaborador);

module.exports = router;
