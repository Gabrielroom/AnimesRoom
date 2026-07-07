import express from 'express'
import db from './db.js'
import cors from 'cors'
import 'dotenv/config';





const DBD = process.env;
const app = express();
app.use(cors());
app.use(express.static("../frontend"));

// Rota para pegar episódios
app.get('/episodes', (req, res) => {
        db.query("SELECT * FROM episodes WHERE tipo = 'semanal'", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// Rota para pegar episódios da temporada
app.get('/episodes_temporada', (req, res) => {
    db.query("SELECT * FROM episodes WHERE tipo = 'temporada'", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});


// Rota para pegar apenas um episódio
app.get('/episodes/:id', (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM episodes WHERE id = ?",
        [id],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results[0]);
        }
    );

});


// Rota para pegar todos episódios de um anime
app.get('/episodes/anime/:animeId', (req, res) => {

    const animeId = req.params.animeId;

    db.query(
        "SELECT * FROM episodes WHERE anime_id = ?",
        [animeId],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );

});


// Rota Next Ep

app.get('/episodes/:id/next', (req, res) => {

    const id = req.params.id;

    db.query(
        `
        SELECT e2.*
        FROM episodes e1
        JOIN episodes e2
            ON e1.anime_id = e2.anime_id
        WHERE e1.id = ?
        AND e2.episode = e1.episode + 1
        LIMIT 1
        `,
        [id],
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results[0] || null);

        }
    );

});


// Rota Previous Ep
app.get('/episodes/:id/previous', (req, res) => {

    const id = req.params.id;

    db.query(
        `
        SELECT e2.*
        FROM episodes e1
        JOIN episodes e2
            ON e1.anime_id = e2.anime_id
        WHERE e1.id = ?
        AND e2.episode = e1.episode - 1
        LIMIT 1
        `,
        [id],
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results[0] || null);

        }
    );

});



console.log(DBD.DB_USER);

app.listen(DBD.PORT, (error) => {
    if (error) {
        console.log(error, "Erro! Servidor não inicializado!!!");
    }
    else
    console.log('Servidor rodando na porta 3000');
});



