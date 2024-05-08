// controllers/episController.js
const database = require('../database');

exports.obterEPI = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM epis WHERE id = $1';
        const result = await database.query(query, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'EPI não encontrado.' });
        } else {
            res.status(200).json({ epis: result.rows[0] });
        }
    } catch (error) {
        console.error('Erro ao obter EPI:', error);
        res.status(500).json({ message: 'Erro ao obter EPI.' });
    }
};

exports.editarEPI = async (req, res) => {
    const { id } = req.params;
    const { nome, quantidade, codigo } = req.body;
    try {
        const query = 'UPDATE epis SET nome = $1, quantidade = $2, codigo = $3 WHERE id = $4';
        await database.query(query, [nome, quantidade, codigo, id]);
        res.status(200).json({ message: 'EPI editado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao editar EPI.' });
    }
};


exports.cadastrarEPI = async (req, res) => {
    const { nome, quantidade, codigo } = req.body;
    try {
        const query = 'INSERT INTO epis (nome, quantidade, codigo) VALUES ($1, $2, $3)';
        await database.query(query, [nome, quantidade, codigo]);
        res.status(201).json({ message: "EPI adicionado com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao adicionar EPI." });
    }
};

exports.listarEPIs = async (req, res) => {
    try {
        const query = 'SELECT * FROM epis';
        const result = await database.query(query);
        res.status(200).json({ epis: result.rows });
    } catch (error) {
        console.error('Erro ao listar EPIs:', error);
        res.status(500).json({ status: 'Erro ao listar EPIs. Por favor, tente novamente mais tarde.' });
    }

    

};

exports.removerEPI = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM epis WHERE id = $1';
        await database.query(query, [id]);
        res.status(200).json({ message: 'EPI removido com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao remover EPI.' });
    }
};
