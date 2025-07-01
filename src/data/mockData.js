export const officials = [
  {
    id: 1,
    name: "Nancy Pelosi",
    title: "Representative",
    state: "California",
    district: "11th District",
    party: "Democratic",
    position: "House Representatives",
    avatar: "NP",
    totalTrades: 47,
    totalVolume: 15200000,
    recentTrades: [
      { date: "2024-12-15", company: "NVIDIA Corp", type: "Buy", amount: 750000, symbol: "NVDA" },
      { date: "2024-12-10", company: "Apple Inc", type: "Sell", amount: 500000, symbol: "AAPL" },
      { date: "2024-12-05", company: "Microsoft Corp", type: "Buy", amount: 1200000, symbol: "MSFT" },
      { date: "2024-11-28", company: "Tesla Inc", type: "Sell", amount: 300000, symbol: "TSLA" },
      { date: "2024-11-20", company: "Alphabet Inc", type: "Buy", amount: 900000, symbol: "GOOGL" }
    ],
    holdings: [
      { company: "Apple Inc", value: 5200000, type: "Stock" },
      { company: "Microsoft Corp", value: 3800000, type: "Stock" },
      { company: "Real Estate Portfolio", value: 2100000, type: "Property" },
      { company: "NVIDIA Corp", value: 1900000, type: "Stock" }
    ]
  },
  {
    id: 2,
    name: "Josh Gottheimer",
    title: "Representative",
    state: "New Jersey",
    district: "5th District",
    party: "Democratic",
    position: "House Representatives",
    avatar: "JG",
    totalTrades: 31,
    totalVolume: 8900000,
    recentTrades: [
      { date: "2024-12-18", company: "JPMorgan Chase", type: "Buy", amount: 400000, symbol: "JPM" },
      { date: "2024-12-12", company: "Goldman Sachs", type: "Sell", amount: 250000, symbol: "GS" },
      { date: "2024-12-01", company: "Bank of America", type: "Buy", amount: 180000, symbol: "BAC" },
      { date: "2024-11-25", company: "Wells Fargo", type: "Buy", amount: 320000, symbol: "WFC" }
    ],
    holdings: [
      { company: "JPMorgan Chase", value: 2100000, type: "Stock" },
      { company: "Real Estate Fund", value: 1800000, type: "Trust" },
      { company: "Financial Services ETF", value: 950000, type: "ETF" }
    ]
  },
  {
    id: 3,
    name: "Dan Crenshaw",
    title: "Representative",
    state: "Texas",
    district: "2nd District",
    party: "Republican",
    position: "House Representatives",
    avatar: "DC",
    totalTrades: 28,
    totalVolume: 7200000,
    recentTrades: [
      { date: "2024-12-20", company: "ExxonMobil", type: "Buy", amount: 320000, symbol: "XOM" },
      { date: "2024-12-14", company: "Chevron Corp", type: "Buy", amount: 280000, symbol: "CVX" },
      { date: "2024-12-08", company: "ConocoPhillips", type: "Sell", amount: 150000, symbol: "COP" },
      { date: "2024-11-30", company: "Halliburton", type: "Buy", amount: 200000, symbol: "HAL" }
    ],
    holdings: [
      { company: "Energy Sector ETF", value: 1900000, type: "ETF" },
      { company: "Defense Contractors Fund", value: 1200000, type: "Fund" },
      { company: "Oil & Gas Properties", value: 800000, type: "Property" }
    ]
  },
  {
    id: 4,
    name: "Tommy Tuberville",
    title: "Senator",
    state: "Alabama",
    party: "Republican",
    position: "Senators",
    avatar: "TT",
    totalTrades: 42,
    totalVolume: 12100000,
    recentTrades: [
      { date: "2024-12-19", company: "Lockheed Martin", type: "Buy", amount: 450000, symbol: "LMT" },
      { date: "2024-12-11", company: "Raytheon Tech", type: "Sell", amount: 380000, symbol: "RTX" },
      { date: "2024-12-03", company: "Boeing Co", type: "Buy", amount: 220000, symbol: "BA" },
      { date: "2024-11-26", company: "General Dynamics", type: "Buy", amount: 310000, symbol: "GD" }
    ],
    holdings: [
      { company: "Defense Portfolio", value: 3400000, type: "Portfolio" },
      { company: "Agricultural Land", value: 2800000, type: "Property" },
      { company: "Aerospace ETF", value: 1100000, type: "ETF" }
    ]
  },
  {
    id: 5,
    name: "Mark Kelly",
    title: "Senator",
    state: "Arizona",
    party: "Democratic",
    position: "Senators",
    avatar: "MK",
    totalTrades: 23,
    totalVolume: 6800000,
    recentTrades: [
      { date: "2024-12-16", company: "SpaceX", type: "Buy", amount: 500000, symbol: "SPACE" },
      { date: "2024-12-09", company: "Blue Origin", type: "Buy", amount: 350000, symbol: "BO" },
      { date: "2024-12-02", company: "Virgin Galactic", type: "Sell", amount: 180000, symbol: "SPCE" },
      { date: "2024-11-22", company: "Rocket Lab", type: "Buy", amount: 220000, symbol: "RKLB" }
    ],
    holdings: [
      { company: "Space Technology Fund", value: 2200000, type: "Fund" },
      { company: "Renewable Energy ETF", value: 1500000, type: "ETF" },
      { company: "Arizona Real Estate", value: 900000, type: "Property" }
    ]
  },
  {
    id: 6,
    name: "Alexandria Ocasio-Cortez",
    title: "Representative",
    state: "New York",
    district: "14th District",
    party: "Democratic",
    position: "House Representatives",
    avatar: "AOC",
    totalTrades: 15,
    totalVolume: 3200000,
    recentTrades: [
      { date: "2024-12-13", company: "NextEra Energy", type: "Buy", amount: 180000, symbol: "NEE" },
      { date: "2024-12-07", company: "First Solar", type: "Buy", amount: 150000, symbol: "FSLR" },
      { date: "2024-11-29", company: "Tesla Inc", type: "Buy", amount: 220000, symbol: "TSLA" },
      { date: "2024-11-18", company: "Brookfield Renewable", type: "Buy", amount: 130000, symbol: "BEP" }
    ],
    holdings: [
      { company: "Green Energy Fund", value: 980000, type: "Fund" },
      { company: "ESG Investment Trust", value: 750000, type: "Trust" },
      { company: "Solar Panel Company Stocks", value: 420000, type: "Stock" }
    ]
  }
];