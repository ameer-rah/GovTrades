import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ProfilePage from './components/ProfilePage';
import TrendingPage from './components/TrendingPage';
import WatchlistPage from './components/WatchlistPage';
import Footer from './components/Footer';
import CongressTrades from './components/CongressTrades';

function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [officials, setOfficials] = useState([]);

  useEffect(() => {
    // Fetch real data from backend
    fetch('/api/congress-trades')
      .then(res => res.json())
      .then(data => setOfficials(data));
  }, []);

  const handleSelectOfficial = (official) => {
    setSelectedOfficial(official);
    setActiveTab('profile');
  };

  const toggleWatchlist = (officialId) => {
    setWatchlist(prev => 
      prev.includes(officialId) 
        ? prev.filter(id => id !== officialId)
        : [...prev, officialId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        watchlistCount={watchlist.length}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'search' && (
          <SearchSection 
            officials={officials}
            onSelectOfficial={handleSelectOfficial}
          />
        )}

        {activeTab === 'profile' && selectedOfficial && (
          <ProfilePage 
            official={selectedOfficial}
            watchlist={watchlist}
            toggleWatchlist={toggleWatchlist}
          />
        )}

        {activeTab === 'trending' && (
          <TrendingPage officials={officials} />
        )}

        {activeTab === 'watchlist' && (
          <WatchlistPage 
            watchlist={watchlist}
            officials={officials}
            onSelectOfficial={handleSelectOfficial}
            toggleWatchlist={toggleWatchlist}
          />
        )}
      </div>

      <CongressTrades />

      <Footer />
    </div>
  );
}

export default App;