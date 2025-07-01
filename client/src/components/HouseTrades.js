import React, { useEffect, useState } from 'react';

function HouseTrades() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('/api/house-trades');
        const data = await res.json();
        setTrades(data);
      } catch (err) {
        setError('Failed to fetch trades');
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
    // Poll every 60 seconds for new data
    const interval = setInterval(fetchTrades, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Recent House Trades</h2>
      <ul>
        {trades.slice(0, 20).map(trade => (
          <li key={trade.transaction_id}>
            <strong>{trade.representative}</strong> {trade.type} <strong>{trade.ticker}</strong> on {trade.transaction_date} (${trade.amount})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HouseTrades; 