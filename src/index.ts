import express from "express"
import type { NextFunction, Request, Response } from "express";
import client from "prom-client";

// Create a counter metric
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

const activeRequestsGauge = new client.Gauge({
    name: 'active_requests',
    help: 'Number of active requests'
});

import client from "prom-client";

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});

export const requestCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
    activeRequestsGauge.inc();
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);

        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
        
        activeRequestsGauge.dec();

        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, endTime - startTime);
    });

    next();
};

const app = express()

app.use(requestCountMiddleware)

app.get("/", (req, res) => {
    res.send("Hello World")
})


app.get("/user", (req, res) => {
    res.send("Hello User")
})

app.get("/cpu", (req, res) => {
    for (let i = 0; i < 1000; i++) {
        console.log(i)
    }
})

app.get("/metrics", async(req, res) => {
    const metrics = await client.register.metrics();
    console.log(client.register.contentType)

    res.set('Content-Type', client.register.contentType);
    res.end(metrics);

})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})