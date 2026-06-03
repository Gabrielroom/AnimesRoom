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






console.log(DBD.DB_USER);

app.listen(DBD.PORT, (error) => {
    if (error) {
        console.log(error, "Erro! Servidor não inicializado!!!");
    }
    else
    console.log('Servidor rodando na porta 3000');
});



