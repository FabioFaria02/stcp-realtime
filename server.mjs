import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/stcp-real', async (req, res) => {
  try {
    const url = 'https://stcp.pt/api/stops/CF2/realtime';
    const resp = await fetch(url);
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error('[ERRO proxy]', err);
    res.status(500).send('Erro ao obter dados da STCP');
  }
});

app.listen(3000, () => console.log('Proxy STCP pronto em http://localhost:3000/stcp-real'));
