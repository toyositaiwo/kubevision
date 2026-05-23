# ⎈ KubeVision — Kubernetes Dashboard

A production-ready Kubernetes dashboard with a built-in AI assistant powered by Google Gemini. Monitor your cluster health, pods, deployments, services, and more — all from a clean browser interface.

![GitHub repo](https://img.shields.io/badge/GitHub-toyositaiwo%2Fkubevision-blue?logo=github)
![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.28-blue?logo=kubernetes)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange?logo=google)

---

## 🌐 Live Demo

Open `frontend/index.html` in any browser — no server needed.

---

## 📸 What It Looks Like

KubeVision gives you a dark-themed, real-time dashboard with:

- **Overview** — cluster health, uptime, CPU, memory, disk, network
- **Pods** — all running pods with CPU, memory, restarts, node assignment
- **Deployments** — replica status, images, rollout health
- **Services** — ClusterIP, LoadBalancer, port mappings
- **Nodes** — node health, roles, capacity
- **Namespaces** — all logical cluster partitions
- **Ingress** — HTTP routing rules and TLS termination
- **Events** — live cluster event stream with warnings
- **AI Assistant** — ask Gemini anything about Kubernetes

---

## 🚀 Quick Start — Open in Browser

1. Clone this repo:
```bash
   git clone https://github.com/toyositaiwo/kubevision.git
   cd kubevision
```

2. Open the dashboard:
```bash
   # Windows
   start frontend/index.html

   # Mac
   open frontend/index.html

   # Linux
   xdg-open frontend/index.html
```

3. Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com)

4. Paste the key when prompted — dashboard loads instantly

---

## 🐳 Run with Docker

```bash
# Backend API
docker build -t kubevision-backend ./backend
docker run -d -p 3001:3001 --name kubevision-api kubevision-backend

# Frontend
docker build -t kubevision-frontend ./frontend
docker run -d -p 8080:80 --name kubevision-web kubevision-frontend

# Open http://localhost:8080
```

---

## ☸️ Deploy to Kubernetes

```bash
# Apply all manifests
kubectl apply -f k8s/base/namespace.yaml
kubectl apply -f k8s/base/configmap.yaml
kubectl apply -f k8s/base/backend.yaml
kubectl apply -f k8s/base/frontend.yaml

# Access the dashboard
kubectl port-forward svc/frontend-svc 8080:80 -n kubevision
# Open http://localhost:8080
```

---

## 📁 Project Structure

' ''' '
kubevision/
├── frontend/
│   ├── index.html        # Full dashboard — open this in browser
│   ├── Dockerfile        # nginx container
│   └── nginx.conf        # nginx config with API proxy
├── backend/
│   ├── server.js         # Express API — pods, metrics, events
│   ├── package.json
│   └── Dockerfile
├── k8s/
│   └── base/
│       ├── namespace.yaml
│       ├── configmap.yaml
│       ├── backend.yaml  # Deployment + Service
│       └── frontend.yaml # Deployment + Service
└── README.md
```

---

## ✦ AI Assistant

The AI assistant uses the **Google Gemini API** directly from the browser — free, no credit card required.

Get your free key at [aistudio.google.com](https://aistudio.google.com).

It can help you:
- Explain any Kubernetes concept
- Debug pod issues (CrashLoopBackOff, Pending, OOMKilled)
- Write kubectl commands
- Generate Deployment, Service, Ingress YAML
- Explain RBAC, networking, storage, scaling

---

## 🔐 Security

- API key stored in memory only — never saved to disk
- Clears automatically when browser tab is closed
- Backend runs as non-root user inside containers
- All containers have CPU and memory resource limits
- Liveness and readiness probes configured on all pods

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express |
| AI | Google Gemini 1.5 Flash |
| Container | Docker, nginx |
| Orchestration | Kubernetes |
| Version Control | Git, GitHub |

---

## 📋 Requirements

- Any modern browser (Chrome, Firefox, Edge)
- Free Google account for Gemini API key
- Docker Desktop (optional — for container deployment)
- kubectl + minikube (optional — for Kubernetes deployment)

---

## 👤 Author

**Toyosi Taiwo**
GitHub: [@toyositaiwo](https://github.com/toyositaiwo)

---

## 📜 License

MIT — free to use, modify, and deploy.
