require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Airtable = require('airtable');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

// Routes
app.get('/api/news', async (req, res) => {
  try {
    const records = await base('news_ey')
      .select({
        maxRecords: 50,
        sort: [{ field: 'Created', direction: 'desc' }]
      })
      .all();

    const news = records.map(record => ({
      id: record.id,
      title: record.get('company_name'),
      content: record.get('investment_news'),
      source: record.get('Source'),
      url: Array.isArray(record.get('website')) ? record.get('website')[0] : record.get('website'),
      createdAt: record.get('Created')
    }));

    console.log('Sending news data:', news);
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
