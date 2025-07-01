import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">GovTrades</h3>
            <p className="text-gray-400">
              Promoting transparency in government through financial disclosure tracking.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Data Sources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>U.S. Senate Financial Disclosures</li>
              <li>House Ethics Committee Reports</li>
              <li>STOCK Act Compliance Reports</li>
              <li>Periodic Transaction Reports</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal Notice</h4>
            <p className="text-gray-400 text-sm">
              All data displayed is sourced from publicly available government disclosures. 
              This platform is for informational purposes only and does not constitute financial advice.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 GovTrades. Transparency through technology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;