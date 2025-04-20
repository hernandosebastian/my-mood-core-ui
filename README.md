# My Mood - Core UI

> ⚠️ **Important:**  
> To install and run the backend, please refer to the corresponding repository: [Backend Repository](https://github.com/hernandosebastian/my-mood-core-api).  

## Description

**My Mood** is a web platform that helps users track and analyze their emotional changes throughout the day to improve well-being.  
Built with a scalable architecture and following good software practices, it offers a clean and responsive user interface.  

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Code Quality and Automation](#code-quality-and-automation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [License](#license)

## Technologies Used

- **Frontend**:
  - **React**: v18.3.1
  - **React Query**: v3.39.3
  - **React Router DOM**: v6.27.0
  - **Zod**: v3.23.8
  - **Zustand**: v5.0.1
  - **Universal Cookie**: v7.1.4
  - **ShadCN UI**: [ShadCN UI](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

Make sure you have installed:

- **Node.js** (v18.18.0)
- **npm** (package manager)

### Installing

Clone the repository:

```bash
git clone https://github.com/hernandosebastian/my-mood-core-ui.git
```

Navigate to the project folder:

```bash
cd my-mood-core-ui
```

Install dependencies:

```bash
npm ci
```

> ⚡ **Note:** The project uses `npm ci` to install exact dependency versions.  
> It was not tested with `yarn` or other package managers.

### Running the Application

To start the development server:

```bash
npm run start:dev
```

## Architecture

The frontend follows a **folder-by-feature** architecture with barrel exports.  
This approach enhances maintainability and scalability by grouping related components, hooks, and services into feature-based directories.

## Code Quality and Automation

The project ensures high code quality through the use of **ESLint** and **Prettier**. These tools enforce consistent coding style and formatting across the project.

For automation, **Husky** is configured to lint code before every commit and run tests before each push. If any test fails, the push is automatically blocked.

Additionally, when opening a Pull Request (PR), a **CI/CD pipeline** runs, which installs all dependencies and re-runs the tests to validate the integrity of the codebase before it is merged.

## Testing

The frontend uses **Playwright** for testing, allowing us to run tests in different browsers and mobile devices (iOS and Android).

To run all tests:

```bash
npm run test
```

To open Playwright UI for testing:

```bash
npm run test:ui
```

## Deployment

The **My Mood** platform is deployed as follows:

- **Railway**: Hosting the **frontend**, **backend**, and **database**.
- **Cloudflare**: Providing additional security and optimization.
- **Web App Domain**: [https://my-mood.com.ar/](https://my-mood.com.ar/)

```
[User] → [Cloudflare] → [Railway (Frontend/API/DB)]
```

## Documentation

The project includes a variety of documentation:

- Postman collection
- C4 diagrams (Level 1 and Level 2)
- Entity Relationship Diagram (ERD)
- Sequence diagrams

You can find them in the following directories:

| Type                        | Link                                                                                     |
|-----------------------------|------------------------------------------------------------------------------------------|
| **Postman Collection**       | [Postman Collection](https://github.com/hernandosebastian/my-mood-core-api/tree/main/docs/postman) |
| **C4 Diagrams**              | [C4 Diagrams](https://github.com/hernandosebastian/my-mood-core-api/tree/main/docs/diagrams/c4) |
| **ERD**                      | [Entity Relationship Diagram (ERD)](https://github.com/hernandosebastian/my-mood-core-api/tree/main/docs/diagrams/erd) |
| **Sequence Diagrams**        | [Sequence Diagrams](https://github.com/hernandosebastian/my-mood-core-api/tree/main/docs/diagrams/sequence) |

## License

The project is licensed under the **MIT License**.  
You can find the full text of the license here:  
[MIT License](https://github.com/hernandosebastian/my-mood-core-ui/blob/main/LICENSE)
