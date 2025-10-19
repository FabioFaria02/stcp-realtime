import express from 'express';
import fetch from 'node-fetch';
const app = express();

// O porto onde o seu servidor irá correr (ex: 3000)
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  // Permitir acesso de qualquer origem (CORS)
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// NOVO ENDPOINT: Aceita o código da paragem como um parâmetro no URL
// Ex: /stcp-real/CF2 ou /stcp-real/SAO
app.get('/stcp-real/:paragemCode', async (req, res) => {
  // Captura o código da paragem do URL (ex: CF2)
  const paragemCode = req.params.paragemCode.toUpperCase();
  
  try {
    // Usa o código da paragem na URL da API da STCP
    const url = `https://stcp.pt/api/stops/${paragemCode}/realtime`;
    
    const resp = await fetch(url);
    
    // Verifica se a resposta HTTP é OK
    if (!resp.ok) {
      throw new Error(`API da STCP devolveu erro: ${resp.status}`);
    }
    
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error(`[ERRO proxy para ${paragemCode}]`, err);
    res.status(500).send(`Erro ao obter dados da STCP para a paragem ${paragemCode}.`);
  }
});

app.listen(PORT, () => console.log(`Proxy STCP pronto em http://localhost:${PORT}/stcp-real/{codigo}`));
