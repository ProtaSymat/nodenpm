import express from "express";
import { simpleRandom } from "./src/utils/randomNumber.js";
import { pokemons } from './src/utils/pokemon.js';
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3001;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/random', async (req, res) => {
    const randomNumber = await simpleRandom();
    res.json({ randomNumber: randomNumber });
});

app.get('/pokemon/:id', (req, res) => {
    const id = Number(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);

    if (pokemon) {
        res.json(pokemon);
    } else {
        res.status(404).send('Pokemon not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});