import React from 'react';
import { Calendar, Building, Star } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const ProfilePage = ({ official, watchlist, toggleWatchlist }) => {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {official.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{official.name}</h1>
              <p className="text-lg text-gray-600">{official.title}</p>
              <p className="text-gray-500">{official.state} {official.district && `- ${official.district}`}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                official.party === 'Democratic' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {official.party}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => toggleWatchlist(official.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
              watchlist.includes(official.id)
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Star className={`h-4 w-4 ${watchlist.includes(official.id) ? 'fill-current' : ''}`} />
            <span>{watchlist.includes(official.id) ? 'Watching' : 'Watch'}</span>
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Total Trades</p>
            <p className="text-2xl font-bold text-gray-900">{official.totalTrades}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Total Volume</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(official.totalVolume)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Holdings Value</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(official.holdings.reduce((sum, holding) => sum + holding.value, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="h-6 w-6 mr-3 text-blue-600" />
          Recent Trades
        </h2>
        
        <div className="space-y-4">
          {official.recentTrades.map((trade, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  trade.type === 'Buy' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {trade.type === 'Buy' ? '+' : '-'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{trade.company}</p>
                  <p className="text-sm text-gray-500">{trade.symbol}</p>
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

      {/* Holdings */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building className="h-6 w-6 mr-3 text-blue-600" />
          Asset Holdings
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {official.holdings.map((holding, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{holding.company}</p>
                  <p className="text-sm text-gray-500">{holding.type}</p>
                </div>
                <p className="font-bold text-gray-900">{formatCurrency(holding.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;