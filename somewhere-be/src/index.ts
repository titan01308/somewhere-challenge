import express from 'express';
import { CryptoService } from './CryptoService';

const app = express();
const port = process.env.PORT || 3001;
const symbols = ['bitcoin', 'ethereum', 'dogecoin'];
const cryptoService = new CryptoService(symbols);

app.get('/price/:symbol', (req, res) => {
  const { symbol } = req.params;
  const { minutes } = req.query;
  const historyMinutes = parseInt(minutes as string, 10) || 60;

  const priceInfo = cryptoService.getPriceHistory(symbol, historyMinutes);

  res.json(priceInfo);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
