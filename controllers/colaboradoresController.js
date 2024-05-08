const database = require('../database');



exports.editarColaborador = async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, setor } = req.body;
    try {
        const query = 'UPDATE colaboradores SET nome = $1, cargo = $2, setor = $3 WHERE id = $4';
        await database.query(query, [nome, cargo, setor, id]);
        res.status(200).json({ message: 'Colaborador editado com sucesso.' });
    } catch (error) {
        console.error('Erro ao editar colaborador:', error);
        res.status(500).json({ message: 'Erro ao editar colaborador.' });
    }
};

exports.obterColaborador = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM colaboradores WHERE id = $1';
        const result = await database.query(query, [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Colaborador não encontrado.' });
        } else {
            res.status(200).json({ colaborador: result.rows[0] });
        }
    } catch (error) {
        console.error('Erro ao obter colaborador:', error);
        res.status(500).json({ message: 'Erro ao obter colaborador.' });
    }
};


exports.cadastrarColaborador = async (req, res) => {
    const { nome, cargo, setor } = req.body;
    try {
        const query = 'INSERT INTO colaboradores (nome, cargo, setor) VALUES ($1, $2, $3)';
        await database.query(query, [nome, cargo, setor]);
        res.status(201).json({ message: "Colaborador cadastrado com sucesso." });
    } catch (error) {
        console.error('Erro ao cadastrar colaborador:', error);
        res.status(500).json({ message: "Erro ao cadastrar colaborador." });
    }
};


exports.listarColaboradores = (req, res) => {
    const query = 'SELECT * FROM colaboradores';
    database.query(query)
        .then(resultado => {
            res.status(200).send({ colaboradores: resultado.rows });
        })
        .catch(error => {
            console.error('Erro ao listar colaboradores:', error);
            res.status(500).send({ status: 'Erro ao listar colaboradores' });
        });
};

exports.removerColaborador = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM colaboradores WHERE id = $1';
    database.query(query, [id])
        .then(() => {
            res.status(200).send({ status: 'Colaborador removido com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao remover colaborador:', error);
            res.status(500).send({ status: 'Erro ao remover colaborador' });
        });
};
