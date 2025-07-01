const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// Endpoint to fetch House and Senate trades
app.get('/api/congress-trades', async (req, res) => {
  try {
    // Fetch House trades
    const houseRes = await fetch('https://housestockwatcher.com/api/transactions');
    const houseData = await houseRes.json();

    // Fetch Senate trades
    const senateRes = await fetch('https://senatestockwatcher.com/api/transactions');
    const senateData = await senateRes.json();

    // Combine and sort by date (descending)
    const allTrades = [...houseData, ...senateData].sort(
      (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
    );

    res.json(allTrades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
