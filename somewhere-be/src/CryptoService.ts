import axios, { AxiosInstance } from 'axios';

interface PriceHistory {
  timestamp: number;
  price: number;
}

export class CryptoService {
  private readonly coingeckoBaseURL: string = 'https://api.coingecko.com/api/v3';
  private readonly fetchInterval: number = 60 * 1000;
  private readonly priceHistory: { [symbol: string]: PriceHistory[] } = {};
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly symbols: string[]) {
    this.symbols.forEach(symbol => {
      this.priceHistory[symbol] = [];
    });

    this.axiosInstance = axios.create({
      baseURL: this.coingeckoBaseURL,
      headers: {
        'x_cg_demo_api_key': 'CG-fT7g5rvoP7sWVnpxUgKPxDVx'
      }
    });

    this.fetchAndStorePrices();
    setInterval(() => this.fetchAndStorePrices(), this.fetchInterval);
  }

  private async fetchAndStorePrices() {
    try {
      const response = await this.axiosInstance.get('/simple/price', {
        params: {
          ids: this.symbols.join(','),
          vs_currencies: 'eur'
        }
      });

      const currentTime = Date.now();
      this.symbols.forEach(symbol => {
        const price = response.data[symbol]?.eur;
        if (price) {
          this.priceHistory[symbol].push({ timestamp: currentTime, price });
        }
      });
    } catch (error) {
    }
  }

  getPriceHistory(symbol: string, minutes: number = 60): any {
    const history = this.priceHistory[symbol].filter(
      data => data.timestamp >= Date.now() - minutes * 60 * 1000
    );

    const count = history.length;
    const latest = history[count - 1]?.price || null;

    let sum = 0;
    history.forEach(data => {
      sum += data.price;
    });
    const average = count > 0 ? sum / count : null;

    return {
      latest,
      average,
      history,
      count
    };
  }
}
