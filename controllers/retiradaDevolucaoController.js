const database = require('../database');

exports.registrarRetirada = async (req, res) => {
    const { id_colaborador, id_epi } = req.body;
    try {
        const query = 'INSERT INTO transacoes (id_colaborador, id_epi, tipo_transacao) VALUES ($1, $2, $3)';
        await database.query(query, [id_colaborador, id_epi, "retirada"]);
        res.status(200).json({ status: 'Retirada registrada com sucesso.' });
    } catch (error) {
        console.error('Erro ao registrar retirada:', error);
        res.status(500).json({ error: 'Erro ao registrar retirada. Por favor, tente novamente.' });
    }
};


exports.registrarDevolucao = async (req, res) => {
    const { id_colaborador, id_epi } = req.body;
    try {
        const query = 'INSERT INTO transacoes (id_colaborador, id_epi, tipo_transacao) VALUES ($1, $2, $3)';
        await database.query(query, [id_colaborador, id_epi, 'devolucao']);
        res.status(200).json({ status: 'Devolução registrada com sucesso.' });
    } catch (error) {
        console.error('Erro ao registrar devolução:', error);
        res.status(500).json({ error: 'Erro ao registrar devolução. Por favor, tente novamente.' });
    }
};



exports.listarTransacoes = async (req, res) => {
    const query = `
        SELECT 
            t.id,
            t.id_colaborador,
            t.id_epi,
            t.tipo_transacao,
            t.data_transacao,
            e.nome AS nome_epi,
            c.nome AS nome_colaborador,
            c.cargo AS cargo_colaborador
        FROM 
            transacoes t
        INNER JOIN
            epis e ON t.id_epi = e.id
        INNER JOIN
            colaboradores c ON t.id_colaborador = c.id
    `;
    
    database.query(query)
        .then(resultado => {
            res.status(200).send({ transacoes: resultado.rows });
        })
        .catch(error => {
            console.error('Erro ao listar transações:', error);
            res.status(500).send({ status: 'Erro ao listar transações' });
        });
}

