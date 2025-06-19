import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      console.log('API URL:', apiUrl); // Debug: check if API URL is loaded

      if (!apiUrl) {
        setError("API URL is not defined. Please check your .env file and restart the server.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(apiUrl);
        console.log('Fetched data:', response.data);

        let result = response.data;

        if (Array.isArray(result)) {
          setNews(result);
        } else if (result && Array.isArray(result.news)) {
          setNews(result.news);
        } else {
          throw new Error('API returned unexpected format');
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="loading">Loading news...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Latest News</h1>
      </header>
      <main className="news-container">
        {Array.isArray(news) &&
          news.map((item) => {
            // Format website if it's an array
            let websiteLinks = null;
            if (Array.isArray(item.url)) {
              websiteLinks = item.url
                .filter((u) => typeof u === 'string' && u.trim() !== '')
                .map((u, idx, arr) => (
                  <span key={u}>
                    <a href={u} target="_blank" rel="noopener noreferrer">{u}</a>{idx < arr.length - 1 ? ', ' : ''}
                  </span>
                ));
            } else if (typeof item.url === 'string' && item.url) {
              websiteLinks = <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>;
            }

            return (
              <article key={item.id || item._id || item.title} className="news-card">
                <h2>{item.title}</h2>
                {item.company_name && (
                  <p><strong>Company Name:</strong> {item.company_name}</p>
                )}
                {item.production_news && (
                  <p><strong>Production News:</strong> {item.production_news}</p>
                )}
                {item.content && (
                  <p><strong>Investment News:</strong> {item.content}</p>
                )}
                {item.investment_location && (
                  <p><strong>Investment Location:</strong> {item.investment_location}</p>
                )}
                {websiteLinks && (
                  <p><strong>--</strong> {websiteLinks}</p>
                )}
              </article>
            );
          })}
      </main>
    </div>
  );
}

export default App;