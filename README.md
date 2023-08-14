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
  - [API Testing and Documentation](#api-testing-and-documentation)


## Project Overview

The application is utlises Puma's internal data and its competitor's data (open sourced) to generate relevant insights and visuals to guide business strategy and decisions. Do take note that Puma;'s internal data will be seeded due to the nature of non-disclosure.

## Technologies

- Ruby on Rails (Backend)
- React (Frontend)
- Google Cloud Platfrom (Deployment)

Architecture Diagram
![Architecture Diagram](https://github.com/Service-Design-Studio/1d-final-project-2023-sds-2023-team-03/blob/main/image-1.png?raw=true)

Microservice Diagram
![Microservice Diagram](https://github.com/Service-Design-Studio/1d-final-project-2023-sds-2023-team-03/blob/main/image-2.png?raw=true)

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
   cd ./frontend/
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
   cd ./backend/
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
4. Customizing insights
Located in: /backend/lib/insights

To add:
```
- Add a function file and name it accordingly to one of the global or product folders.
- Add the file name to the bundler according to the insight type.
```
  
To modify:
```
- Simply edit the files with the insight name you wish to edit.
- If the name must be changed, remember to change its output as well as bundler entry as well.
```

### Unit Testing

### API Testing and Documentation
https://solar-flare-597216.postman.co/workspace/New-Team-Workspace~f21a8933-11ff-4b64-925a-36ea3f69caa1/collection/26558963-f93f0485-05b8-47c9-ac83-f28e647ca5eb?action=share&creator=26558963
