import React from 'react';
import { formatCurrency } from '../utils/helpers';

const TrendingPage = ({ officials }) => {
  const getTrendingTrades = () => {
    const allTrades = officials.flatMap(official => 
      official.recentTrades.map(trade => ({
        ...trade,
        officialName: official.name,
        officialId: official.id
      }))
    );
    return allTrades.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 15);
  };

  const trendingTrades = getTrendingTrades();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Trades</h2>
        <p className="text-lg text-gray-600">Most recent financial activities across all tracked officials</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="space-y-4">
          {trendingTrades.map((trade, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  trade.type === 'Buy' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {trade.type === 'Buy' ? '+' : '-'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{trade.company}</p>
                  <p className="text-sm text-gray-500">by {trade.officialName}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-bold ${trade.type === 'Buy' ? 'text-green-600' : 'text-red-600'}`}>
                  {trade.type === 'Buy' ? '+' : '-'}{formatCurrency(trade.amount)}
                </p>
                <p className="text-sm text-gray-500">{new Date(trade.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;