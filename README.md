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

The application is utlises Puma's internal data and its competitor's data (open sourced) to generate relevant insights and visuals to guide business strategy and decisions. Do take note that Puma's internal data will be seeded due to the nature of non-disclosure.

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

### Insights configuration:
- Located in: /backend/lib/insights
- Severity levels may be changed in **insights/insights_config.rb**
- Insights typically have the following output:
```
{
  :name => "name",        # typically same as file name without "apply"
  :text => "message",     # message that comes with the insight to be displayed on the frontend
  :severity => {      
    :label => InsightsConfig.severity[N],                                # name of severity level, check insights/insights_config.rb for more info
    :level => InsightsConfig.severity.key(InsightsConfig.severity[1])    # severity level integer, check insights/insights_config.rb for more info
  },
  :type => "arbitrary type"  # this is ONLY used in GLOBAL insights; used to determine icon beside the insight in the overview page
}
```

### insights/insights_config.rb:

To add new insights, or removing existing ones, remove the insight name from the corresponding array in the InsightsConfig module.

**As each type of insight (global, product, etc.) have different outputs, they each come with a different bundler.**

**This means they're in separate arrays!!**
```
@@product_insights = [
  :apply_sales_change,
  :apply_declining_seven_days,
  :apply_popular
]

@@global_insights = [
  :insight_a,
  :insight_b,
  :insight_c
]
```

### To add new insights:
- Add a function file and name it accordingly to one of the global or product folders.
- Ensure the file outputs an insight according to the above.
- Check the bundler file to see what inputs each type of insight takes.
- Add the file name to the config array according to the insight type.
  
### To modify:
- Simply edit the files with the insight name you wish to edit.
- If the name must be changed, remember to change its output as well as bundler (insights_config.rb) entry as well. 

### To delete:
- Simply remove the name of the insight from the array in the InsightsConfig module.
- If need be, delete the file after this.


### Unit Testing

### API Testing and Documentation
https://solar-flare-597216.postman.co/workspace/New-Team-Workspace~f21a8933-11ff-4b64-925a-36ea3f69caa1/collection/26558963-f93f0485-05b8-47c9-ac83-f28e647ca5eb?action=share&creator=26558963
