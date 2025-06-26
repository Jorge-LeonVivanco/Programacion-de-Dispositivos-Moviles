import * as functions from 'firebase-functions';
import fetch from 'node-fetch';

export const newsProxy = functions.https.onRequest(async (req, res) => {
  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight (CORS)
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const apiKey = 'ad26d62d46f145f8ac6f6c11850d77ad';
  const { category = 'business', country = 'us', page = 1, pageSize = 10 } = req.query;

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('Error al consumir NewsAPI:', data);
      res.status(response.status).json(data); // ✅ sin return
      return;
    }

    res.status(200).json(data); // ✅ sin return
  } catch (err) {
    console.error('Excepción al consumir NewsAPI:', err);
    res.status(500).json({ error: 'Internal server error' }); // ✅ sin return
  }
});
