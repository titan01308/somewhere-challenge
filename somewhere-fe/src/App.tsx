import React, { useState, useEffect } from 'react';
import axios from 'axios';
import History from './components/history/history';
import SampleButton from './components/button/button';

const symbols = ['bitcoin', 'ethereum', 'dogecoin'];

const App: React.FC = () => {
  const [symbol, setSymbol] = useState<string>(symbols[0]);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/price/${symbol}`);
        setData(response.data);
      } catch (error) {
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); 

    return () => clearInterval(interval);
  }, [symbol]);

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cryptocurrency Price Tracker</h1>
        <div className="nav">
          {symbols.map(sym => (
            <SampleButton
              key={sym}
              isActive={symbol === sym}
              onClick={() => handleSymbolChange(sym)}
              title={sym.toUpperCase()}
            />
          ))}
        </div>
        <div className="price-info">
          <p>Latest Price: {data.latest}</p>
          <p>Average Price: {data.average}</p>
          <History historyData={data.history} />
        </div>
      </header>
    </div>
  );
};

export default App;
