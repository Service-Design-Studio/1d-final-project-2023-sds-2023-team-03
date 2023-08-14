# Puma SEA E-Commerce Analytics Tool

A Service Design Studio Project in collaboration with Puma SEA E Commerce Team

[Google Sites](https://sites.google.com/view/ctrl-design/home)

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Frontend](#Frontend)
  - [Backend](#Backend)
  - [Unit Testing](#unit-testing)


## Project Overview

Provide a brief introduction to the project, its purpose, and main features.

## Technologies

- Ruby on Rails (Backend)
- React (Frontend)
- Google Cloud Platfrom (Deployment)

Architecture Diagram

Microservice Diagram

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Ruby: [Installation Guide](https://www.ruby-lang.org/en/documentation/installation/)
- Node.js and npm: [Installation Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

1. Clone the repository: 

   ```bash
   git clone https://github.com/Service-Design-Studio/1d-final-project-2023-sds-2023-team-03.git
   ```

### Frontend
- Our frontend utilises the React framework.
1. Navigate to Frontend folder
```bash
   cd .\frontend\
```
2. Install Frontend Dependencies
```bash
npm i --legacy-peer-deps
```
3. Run in Local Host
```bash
npm run dev
```
4. Generate Cucumber Test Case
```bash
npm test
```

### Backend
1. Navigate to Backend folder
```bash
   cd .\backend\
```
2. Install Backend Dependencies
```bash
   bundle install
```
3. Data Migration and Seeding
```bash
rails db:migrate
rails db:seed
```

### Unit Testing


