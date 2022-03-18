const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const translator = require('./utils/translate');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hi from a translator server!');
});

app.post('/api/translate', async(req, res) => {
    const data = req.body;
    try {
        const translate = await translator(data.text, data.to, data.from);
        res.json(translate);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
