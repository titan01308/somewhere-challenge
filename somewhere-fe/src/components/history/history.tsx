import React from 'react';
import './history.css';

interface HistoryItem {
  timestamp: number;
  price: number;
}

interface Props {
  historyData: HistoryItem[];
}

const History: React.FC<Props> = ({ historyData }) => {
  return (
    <div className="history-container">
      <h2>Price History</h2>
      <div className="history-list">
        {historyData && historyData.map((item, index) => (
          <div key={index} className="history-item">
            <span className="timestamp">{new Date(item.timestamp).toLocaleString()}</span>
            <span className="price">{item.price} EUR</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
