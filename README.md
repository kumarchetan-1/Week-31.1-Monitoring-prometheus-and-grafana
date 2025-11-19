# Monitoring with Prometheus and Grafana

A TypeScript/Express.js application that demonstrates Prometheus metrics collection and monitoring. This project implements custom metrics using `prom-client` and exposes them via a `/metrics` endpoint for Prometheus scraping.

## Todo Assignment
![Monitoring Setup](./image.png)

## Features

- **HTTP Request Metrics**: Tracks total HTTP requests with method, route, and status code labels
- **Active Requests Gauge**: Monitors the number of concurrent requests
- **Request Duration Histogram**: Measures HTTP request latency with custom buckets
- **Prometheus-Compatible Endpoint**: Exposes metrics in Prometheus format at `/metrics`

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- TypeScript (installed as a dependency)

## Installation

1. Clone the repository:
```bash
git clone  https://github.com/kumarchetan-1/Week-31.1-Monitoring-prometheus-and-grafana.git 
cd Week-31.1-monitoring-prometheus-graphana
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development

Build and run the application:
```bash
npm run dev
```

### Production

Build the TypeScript code:
```bash
npm run build
```

Start the server:
```bash
npm start
```

The server will start on port 3000 by default.

## API Endpoints

- `GET /` - Returns "Hello World"
- `GET /user` - Returns "Hello User"
- `GET /cpu` - CPU-intensive endpoint (for testing)
- `GET /metrics` - **Prometheus metrics endpoint** (exposes all collected metrics)

## Metrics Exposed

The application exposes the following Prometheus metrics:

1. **`http_requests_total`** (Counter)
   - Description: Total number of HTTP requests
   - Labels: `method`, `route`, `status_code`

2. **`active_requests`** (Gauge)
   - Description: Number of active requests

3. **`http_request_duration_ms`** (Histogram)
   - Description: Duration of HTTP requests in milliseconds
   - Labels: `method`, `route`, `code`
   - Buckets: `[0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000]`

## Integrating with Prometheus

1. **Configure Prometheus** to scrape metrics from this application:

Add the following job to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'express-app'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
    scrape_interval: 15s
```

2. **Start Prometheus**:
```bash
prometheus --config.file=prometheus.yml
```

3. **Access Prometheus UI**: Navigate to `http://localhost:9090`

## Integrating with Grafana

1. **Add Prometheus as a Data Source**:
   - Go to Grafana → Configuration → Data Sources
   - Add Prometheus
   - Set URL to `http://localhost:9090` (or your Prometheus instance)

2. **Create Dashboards**:
   - Use the exposed metrics to create visualizations
   - Example queries:
     - `rate(http_requests_total[5m])` - Request rate
     - `active_requests` - Current active requests
     - `histogram_quantile(0.95, http_request_duration_ms_bucket)` - 95th percentile latency

## Project Structure

```
.
├── src/
│   └── index.ts          # Main application file with Express server and metrics
├── dist/                 # Compiled JavaScript output
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Dependencies

- **express**: Web framework for Node.js
- **prom-client**: Prometheus client library for Node.js
- **typescript**: TypeScript compiler

## Development Tasks

This project is part of a learning journey covering:
- Express.js with Prometheus metrics
- Prometheus client implementation
- Grafana dashboard creation
- Monitoring best practices

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!
