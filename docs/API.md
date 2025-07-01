# GovTrades API Documentation

## Overview

This document outlines the API structure and data models used in the GovTrades application. Currently, the application uses mock data, but this structure is designed to be easily replaceable with real API endpoints.

## Data Models

### Official

Represents a government official and their financial information.

```typescript
interface Official {
  id: number;
  name: string;
  title: string;
  state: string;
  district?: string;
  party: "Democratic" | "Republican" | "Independent";
  position: "Senators" | "House Representatives" | "Supreme Court Justices" | "Cabinet Members" | "State Governors";
  avatar: string;
  totalTrades: number;
  totalVolume: number;
  recentTrades: Trade[];
  holdings: Holding[];
}
```

### Trade

Represents a financial transaction made by an official.

```typescript
interface Trade {
  date: string; // ISO date string
  company: string;
  type: "Buy" | "Sell";
  amount: number;
  symbol: string;
}
```

### Holding

Represents an asset holding of an official.

```typescript
interface Holding {
  company: string;
  value: number;
  type: "Stock" | "Property" | "Trust" | "ETF" | "Fund" | "Portfolio";
}
```

## API Endpoints (Future Implementation)

### GET /api/officials

Returns a list of all tracked officials.

**Response:**
```json
{
  "officials": Official[],
  "total": number,
  "page": number,
  "limit": number
}
```

**Query Parameters:**
- `page` (optional): Page number for pagination
- `limit` (optional): Number of results per page
- `position` (optional): Filter by position type
- `party` (optional): Filter by political party
- `state` (optional): Filter by state

### GET /api/officials/:id

Returns detailed information for a specific official.

**Response:**
```json
{
  "official": Official
}
```

### GET /api/officials/:id/trades

Returns trading history for a specific official.

**Response:**
```json
{
  "trades": Trade[],
  "total": number,
  "official": {
    "id": number,
    "name": string
  }
}
```

**Query Parameters:**
- `start_date` (optional): Filter trades from this date
- `end_date` (optional): Filter trades until this date
- `type` (optional): Filter by "Buy" or "Sell"
- `limit` (optional): Number of results to return

### GET /api/officials/:id/holdings

Returns current holdings for a specific official.

**Response:**
```json
{
  "holdings": Holding[],
  "totalValue": number,
  "official": {
    "id": number,
    "name": string
  }
}
```

### GET /api/trades/trending

Returns recently trending trades across all officials.

**Response:**
```json
{
  "trades": Array<Trade & { officialName: string, officialId: number }>,
  "total": number
}
```

**Query Parameters:**
- `limit` (optional): Number of results to return (default: 10)
- `days` (optional): Number of days to look back (default: 30)

### GET /api/search

Search for officials by name or other criteria.

**Response:**
```json
{
  "results": Official[],
  "total": number,
  "query": string
}
```

**Query Parameters:**
- `q` (required): Search query
- `type` (optional): Search type ("name", "state", "position")

## Data Sources

The API would integrate with the following data sources:

### Government Sources
- **U.S. Senate Financial Disclosures**: https://efdsearch.senate.gov/
- **House Ethics Committee**: https://disclosures-clerk.house.gov/
- **FEC Financial Reports**: https://www.fec.gov/
- **STOCK Act Reports**: Periodic Transaction Reports

### Data Processing Pipeline

1. **Data Ingestion**: Automated scraping and parsing of government disclosure forms
2. **Data Validation**: Verification and cross-referencing of financial information
3. **Data Normalization**: Standardizing formats and company names
4. **Real-time Updates**: Monitoring for new filings and updates

## Authentication & Rate Limiting

### Public API Access
- No authentication required for basic read operations
- Rate limiting: 100 requests per hour per IP
- Caching: 15-minute cache for most endpoints

### Premium API Access
- API key required
- Higher rate limits: 1000 requests per hour
- Real-time notifications for new trades
- Historical data access beyond 2 years

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error context"
  },
  "timestamp": "2025-01-01T00:00:00Z",
  "path": "/api/officials/123"
}
```

### Error Codes
- `OFFICIAL_NOT_FOUND`: Official with specified ID does not exist
- `INVALID_PARAMETERS`: Request parameters are invalid
- `RATE_LIMIT_EXCEEDED`: API rate limit has been exceeded
- `DATA_UNAVAILABLE`: Requested data is temporarily unavailable

## Webhooks (Future Feature)

### Trade Alerts
Subscribe to real-time notifications when specific officials make trades.

**Endpoint:** `POST /api/webhooks/trade-alerts`

**Payload:**
```json
{
  "event": "new_trade",
  "official": Official,
  "trade": Trade,
  "timestamp": "2025-01-01T00:00:00Z"
}
```

## Implementation Notes

### Current Status
- **Mock Data**: Application currently uses static mock data
- **Frontend Ready**: All components are designed to work with real API endpoints
- **Type Safety**: TypeScript interfaces defined for all data models

### Migration Path
1. Replace mock data imports with API calls
2. Add error handling and loading states
3. Implement caching strategy
4. Add authentication for premium features

### Performance Considerations
- Implement pagination for large datasets
- Use caching for frequently accessed data
- Consider GraphQL for flexible data fetching
- Add CDN for static assets and images