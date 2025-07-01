import React, { useState, useMemo } from 'react';
import { Search, Users, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const SearchSection = ({ officials, onSelectOfficial }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const positions = [
    "Senators",
    "House Representatives", 
    "Supreme Court Justices",
    "Cabinet Members",
    "State Governors"
  ];

  // Filter suggestions based on search term
  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    return officials.filter(official => 
      official.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [searchTerm, officials]);

  // Filter officials by position
  const filteredByPosition = useMemo(() => {
    if (!selectedPosition) return officials;
    return officials.filter(official => official.position === selectedPosition);
  }, [selectedPosition, officials]);

  const handleSearch = (official) => {
    onSelectOfficial(official);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Track Government Officials' Financial Activities
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay informed about stock trades, asset movements, and financial disclosures 
          of U.S. elected and appointed officials with complete transparency.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Name Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              Search by Name
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter first or last name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((official) => (
                    <button
                      key={official.id}
                      onClick={() => handleSearch(official)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {official.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{official.name}</div>
                        <div className="text-sm text-gray-500">{official.title} - {official.state}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Position Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Search by Position
            </h3>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select a position...</option>
              {positions.map((position) => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
            
            {selectedPosition && (
              <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                {filteredByPosition.map((official) => (
                  <button
                    key={official.id}
                    onClick={() => handleSearch(official)}
                    className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left flex items-center space-x-3 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {official.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{official.name}</div>
                      <div className="text-sm text-gray-500">{official.state}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Officials Tracked</p>
              <p className="text-2xl font-bold text-gray-900">{officials.length}</p>
            </div>
            <Users className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Trade Volume</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(officials.reduce((sum, official) => sum + official.totalVolume, 0))}
              </p>
            </div>
            <DollarSign className="h-10 w-10 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recent Trades (30 days)</p>
              <p className="text-2xl font-bold text-gray-900">
                {officials.reduce((sum, official) => sum + official.recentTrades.length, 0)}
              </p>
            </div>
            <TrendingUp className="h-10 w-10 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;