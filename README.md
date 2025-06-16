# 🚀 k6 Performance Testing with Grafana Cloud

This project uses [k6](https://k6.io/) for performance and load testing, with metrics sent to **Grafana Cloud** for powerful visualizations and dashboards. It is designed for local development and CI environments.

## ⚙️ Setup

### 1. Install k6

Install k6 on your local machine:

```bash
# macOS (Homebrew)
brew install k6

# Ubuntu
sudo apt install k6

# Windows (winget)
winget install k6 --source winget

```

## ⚙️ Grafana Cloud Setup

- create a Grafana Cloud account
- generate and copy Personal API token
- run `k6 cloud login --token <YOUR_API_TOKEN>`

## 🧪 Running Tests

### Local Run

```bash
k6 run tests/groups.test.js
```

### Local Run Verbose

```bash
k6 run tests/groups.test.js --summary-mode=full
```

### Cloud Run

```bash
k6 cloud tests/example-test.js
```

![Cloud run results](src/images/cloud-run-results.png)

### Local Run and Export results to Grafana Cloud

```bash
k6 run tests/groups.test.js -o cloud
```

![Exported results on cloud](src/images/exported-results-on-cloud.png)
