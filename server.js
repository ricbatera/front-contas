const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/dist/herokuTeste`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/herokuTeste/index.html`));
});

app.listen(PORT, ()=>{
    console.log(`Servidor rodadndo na porta: ${PORT}`)
});