import React from 'react';
import { Star } from 'lucide-react';

const WatchlistPage = ({ watchlist, officials, onSelectOfficial, toggleWatchlist }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Watchlist</h2>
        <p className="text-lg text-gray-600">Officials you're following for trade alerts</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
          <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No officials in your watchlist</h3>
          <p className="text-gray-600 mb-6">Start following officials to get notified about their trades</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Browse Officials
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map(officialId => {
              const official = officials.find(o => o.id === officialId);
              if (!official) return null;
              
              return (
                <div key={officialId} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {official.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{official.name}</p>
                      <p className="text-sm text-gray-500">{official.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => onSelectOfficial(official)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => toggleWatchlist(officialId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Unwatch
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;