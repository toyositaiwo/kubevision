const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3001;
let requestCount = 0;
let startTime = Date.now();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => { requestCount++; next(); });

app.get("/health/live", (req, res) => {
  res.json({ status: "alive", timestamp: new Date().toISOString() });
});

app.get("/health/ready", (req, res) => {
  res.json({ status: "ready", timestamp: new Date().toISOString() });
});

app.get("/api/system", (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    cpuCount: os.cpus().length,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    loadAvg: os.loadavg(),
    nodeVersion: process.version,
    pod: process.env.POD_NAME || os.hostname(),
    namespace: process.env.NAMESPACE || "default",
    version: process.env.APP_VERSION || "1.0.0",
  });
});

app.get("/api/metrics", (req, res) => {
  const mem = process.memoryUsage();
  res.json({
    requestCount,
    uptime: Math.floor((Date.now() - startTime) / 1000),
    memory: { rss: mem.rss, heapUsed: mem.heapUsed, heapTotal: mem.heapTotal },
    cpu: os.loadavg()[0].toFixed(2),
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/pods", (req, res) => {
  res.json([
    { name: "frontend-7d4f9b-abc12", status: "Running", restarts: 0, age: "2d", cpu: "12m", memory: "64Mi", node: "node-1" },
    { name: "backend-6c8d4b-xk2p9", status: "Running", restarts: 1, age: "2d", cpu: "25m", memory: "128Mi", node: "node-2" },
    { name: "postgres-0", status: "Running", restarts: 0, age: "5d", cpu: "8m", memory: "256Mi", node: "node-1" },
    { name: "redis-master-0", status: "Running", restarts: 0, age: "5d", cpu: "4m", memory: "32Mi", node: "node-3" },
    { name: "nginx-ingress-5f7c", status: "Running", restarts: 0, age: "7d", cpu: "6m", memory: "48Mi", node: "node-2" },
  ]);
});

app.get("/api/deployments", (req, res) => {
  res.json([
    { name: "frontend", desired: 2, ready: 2, available: 2, image: "kubevision-frontend:latest", age: "2d" },
    { name: "backend", desired: 3, ready: 3, available: 3, image: "kubevision-backend:latest", age: "2d" },
    { name: "postgres", desired: 1, ready: 1, available: 1, image: "postgres:15-alpine", age: "5d" },
    { name: "redis", desired: 1, ready: 1, available: 1, image: "redis:7-alpine", age: "5d" },
  ]);
});

app.get("/api/services", (req, res) => {
  res.json([
    { name: "frontend-svc", type: "ClusterIP", clusterIP: "10.96.0.100", port: "80/TCP", age: "2d" },
    { name: "backend-svc", type: "ClusterIP", clusterIP: "10.96.0.101", port: "3001/TCP", age: "2d" },
    { name: "postgres-svc", type: "ClusterIP", clusterIP: "10.96.0.102", port: "5432/TCP", age: "5d" },
    { name: "redis-svc", type: "ClusterIP", clusterIP: "10.96.0.103", port: "6379/TCP", age: "5d" },
    { name: "ingress-nginx", type: "LoadBalancer", clusterIP: "10.96.0.1", port: "80:32000/TCP", age: "7d" },
  ]);
});

app.get("/api/namespaces", (req, res) => {
  res.json([
    { name: "default", status: "Active", age: "7d" },
    { name: "kube-system", status: "Active", age: "7d" },
    { name: "kube-public", status: "Active", age: "7d" },
    { name: "monitoring", status: "Active", age: "3d" },
    { name: "kubevision", status: "Active", age: "2d" },
  ]);
});

app.get("/api/events", (req, res) => {
  res.json([
    { type: "Normal", reason: "Scheduled", object: "Pod/backend-6c8d4b", message: "Successfully assigned kubevision/backend to node-2", age: "2m" },
    { type: "Normal", reason: "Pulled", object: "Pod/frontend-7d4f9b", message: "Successfully pulled image kubevision-frontend:latest", age: "5m" },
    { type: "Normal", reason: "Started", object: "Pod/redis-master-0", message: "Started container redis", age: "10m" },
    { type: "Warning", reason: "BackOff", object: "Pod/job-migr8", message: "Back-off restarting failed container", age: "15m" },
    { type: "Normal", reason: "ScalingReplicaSet", object: "Deployment/backend", message: "Scaled up replica set to 3", age: "1h" },
  ]);
});

app.listen(PORT, () => {
  console.log(`KubeVision backend running on port ${PORT}`);
});
