# News Aggregation App

A full-stack news aggregation application that uses Airtable as a database, n8n for web scraping automation, and React for the frontend.

## Features

- React frontend with real-time news updates
- Node.js backend API to proxy Airtable requests
- n8n workflow automation for news scraping
- Docker containerization for easy deployment
- Secure handling of API keys

## Prerequisites

- Docker and Docker Compose
- Airtable account and API key
- n8n account (optional for advanced workflows)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd news-aggregation-app
```

2. Create a `.env` file from the template:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Airtable credentials:
```
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
```

4. Start the application:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- n8n: http://localhost:5678

## n8n Workflow Setup

1. Access n8n at http://localhost:5678
2. Create a new workflow
3. Add a "Schedule Trigger" node to run the workflow periodically
4. Add a "Web Scraping" node to fetch news from your target websites
5. Add an "Airtable" node to store the scraped data
6. Save and activate the workflow

## Production Deployment

### Option 1: Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following environment variables:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
4. Deploy!

### Option 2: Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add the required environment variables
4. Deploy!

## Production Improvements

1. Add Nginx as a reverse proxy:
```yaml
# Add to docker-compose.yml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
```

2. Enable HTTPS with Let's Encrypt
3. Set up proper logging and monitoring
4. Implement rate limiting
5. Add caching layer (Redis)
6. Set up automated backups

## Security Considerations

- API keys are never exposed to the frontend
- Backend acts as a proxy for Airtable requests
- CORS is properly configured
- Helmet.js provides security headers
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 