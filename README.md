# StarWars Ship-Pilot Registry
- This project was built to show what pilots are associated with known starships. This data comes from The Star Wars API (https://swapi.dev).

## Table of Contents
- [Approach](#approach)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Ideas](#ideas)
- [Production-Deployment-Strategy](#production-deployment-strategy)

## Approach
 The starwars.js file contains a few functions to fetch all available starships through a paginated response. Once the starships are retrieved, all pilot id's are extracted and then fetched in parallel to increase efficiency. Once all the data is retrieved, the data is then logged to the console in a easily readable manner.


## Installation
1. Clone the repository:
```bash
 git clone https://github.com/1sdc0d3r/devOps-starwars.git
```
<!-- # Instructions on building/running the container, an explanation of your approach, and bonus deployment considerations -->


2. Start Docker:
 If you don't have docker installed you may download it from: https://www.docker.com/products/docker-desktop/
 ```bash 
 Mac: run "open -a docker"

Windows: 
1. Start->Run-> services.msc
2. Search for service named "Docker" or "Docker Desktop"
3. Start service
```
If you are not able to start docker please refer to this link: https://docs.docker.com/engine/daemon/start/

3. Build a docker image:
```bash
docker build -t 1sdc0d3r/devops-starwars .
```

## Usage
To run the project locally (without docker), use the following commands:
```bash
npm i && npm start
```

To run the project via docker, use the following command:
```bash
docker run 1sdc0d3r/devops-starwars
```

## License
This project is licensed under the [MIT License](LICENSE).

## Ideas
- Allow user to search for a specific starship to get more details on ship and/or get pilots for said ship
- Allow search for pilot to get all ships they can fly, and/or get more information about the pilot

## Production-Deployment-Strategy

## 1. Container Orchestration & Scaling

### Orchestration Tools
- **Docker Swarm**: Suitable for simpler containerized applications to increase availability, load balance, and scale across multiple nodes.

### Scaling Strategies
- **Auto-Scaling**: You can use Kubernetes to autoscale based on CPU usage and memory utilization.

## 2. Monitoring & Logging

### Monitoring Tools
- **Kubernetes Metrics Server**: Metrics Server is scalable, and a source of container resource metrics (CPU, memory) for Kubernetes with built-in autoscaling pipelines.

### Logging Strategies
- **Centralized Logging**: Use ELK Stack (Elasticsearch, Logstash, Kibana) or Fluentd for aggregating and visualizing logs.

## 3. CI/CD Pipeline

### Docker Build Integration
- **Other Tools**: Implement CI/CD using GitHub Actions or GitLab CI

### Pipeline Stages
1. **Build Stage**: Build Docker image and push to a container registry (via build integration tools)
2. **Test Stage**: Run unit tests, integration tests, and security scans. This can be done automatically and then deployed if all tests pass.
3. **Deploy Stage**: Deploy to Kubernetes or other docker hosting platform.
