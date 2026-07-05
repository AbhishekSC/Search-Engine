# 🔍 Product Search Engine

A full-stack Product Search Engine built with **React**, **Node.js**, **Express**, and **TypeScript**.

The application enables users to search products using a custom relevance ranking algorithm, filter by category and price, paginate results, and provides a fast search experience with debounced API requests.

---

# Features

## Backend

- RESTful Product Search API
- Custom relevance ranking algorithm
- Search across:
  - Product Name
  - Description
  - Tags
- Category filtering
- Min/Max price filtering
- Server-side pagination
- Request validation
- Layered architecture (Controller → Service → Repository)
- TypeScript support
- Docker support
- Unit & Integration tests

---

## Frontend

- Search products
- Debounced search (300ms)
- Category dropdown
- Min / Max price filters
- Responsive product grid
- Pagination
- Loading state
- Error handling
- Empty search state
- Product cards
- Relevance score badge

---

# Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Frontend

- React
- TypeScript
- Vite
- Axios

## Testing

- Jest
- Supertest
- React Testing Library

## Dev Tools

- Docker
- Docker Compose
- Git

---

# Project Structure

```text
search-engine/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repository/
│   │   ├── validators/
│   │   ├── data/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```

---

# Search Algorithm

Instead of returning products based only on text matching, the application assigns a **weighted relevance score** to every matching product.

### Scoring Strategy

| Match Type | Score |
|------------|------:|
| Product Name | +5 |
| Product Tags | +3 |
| Product Description | +2 |

The final score is calculated by adding the weights of all matched fields.

Products are then sorted in **descending order of relevance score**, ensuring that the most relevant products appear first.

### Example

Search Query

```
wireless mouse
```

Product A

- Name contains "wireless"
- Description contains "mouse"

Score

```
5 + 2 = 7
```

Product B

- Tag contains "wireless"

Score

```
3
```

Final Result

```
1. Product A
2. Product B
```

This ranking provides significantly better search results compared to a simple substring search.

---

# Relevance Score

The backend returns a numeric relevance score for each product.

The frontend displays this score on each product card so users can understand why products are ranked in a particular order.

Example

```
Relevance: 7.00
```

---

# API

## Search Products

```
GET /products
```

### Query Parameters

| Parameter | Description |
|------------|-------------|
| q | Search keyword |
| category | Category filter |
| minPrice | Minimum price |
| maxPrice | Maximum price |
| page | Page number |
| limit | Items per page |

Example

```
GET /products?q=laptop&category=electronics&minPrice=1000&maxPrice=5000&page=1&limit=12
```

---

# Pagination

Pagination is handled on the backend.

Each response includes:

- Current page
- Total pages
- Total products
- Items per page

This keeps the API efficient even for large datasets.

---

# Filters

Users can combine multiple filters together.

Example

```
Search Keyword
+
Category
+
Minimum Price
+
Maximum Price
```

All filters are applied before ranking and pagination.

---

# Debounced Search

The frontend waits **300 milliseconds** after the user stops typing before sending a search request.

Benefits

- Reduces API calls
- Improves user experience
- Reduces server load
- Prevents unnecessary requests while typing

---

# Running the Project

## 1. Clone the repository

```bash
git clone <repository-url>
cd search-engine
```

## 2. Install dependencies

### Backend

```bash
cd backend
npm install
npm run seed
```
npm run seed -> (to generate random 500 products data)

### Frontend

```bash
cd ../client
npm install
```

## 3. Start the application

### Option 1: Using Docker (Recommended)

From the project root:

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3009

### Option 2: Run locally

Start the backend:

```bash
cd backend
npm run dev
```

Open a new terminal and start the frontend:

```bash
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3009

## 4. Run Tests

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd client
npm test
```

---

# Testing

The project includes automated tests for both the backend API and the frontend application to verify the core search functionality.

---

# Backend Tests

Backend tests are written using **Jest** and **Supertest**.

### Covered Test Cases

- Returns all products successfully.
- Returns products matching the search query.
- Searches across product name, description, and tags.
- Validates search response structure.
- Confirms successful API response (HTTP 200).

### Run Backend Tests

```bash
cd backend
npm install
npm test
```

Run a specific test file:

```bash
npm test -- search.test.ts
```

---

# Frontend Tests

Frontend tests are written using **Vitest** and **React Testing Library**.

### Covered Test Cases

- Renders products returned from the API.
- Updates the search input correctly.
- Renders category and price filter controls.

### Run Frontend Tests

```bash
cd client
npm install
npm test
```

Run tests once with verbose output:

```bash
npx vitest run --reporter=verbose
```

---

# Test Summary

## Backend

✅ Search API returns products

✅ Product search works correctly

✅ API response validation

## Frontend

✅ Products render correctly

✅ Search input updates correctly

✅ Category and price filters render correctly

---

# Testing Tools

## Backend

- Jest
- Supertest

## Frontend

- Vitest
- React Testing Library
- jest-dom

---

# Expected Result

When all tests pass, you should see output similar to:

Backend

```text
PASS src/tests/search.test.ts

Test Suites: 1 passed
Tests: 2 passed
```

Frontend

```text
PASS src/pages/Home.test.tsx

✓ renders products from the API
✓ updates the search input
✓ renders category and price filters

Test Files: 2 passed
Tests: 4 passed
```

---

# Assumptions

- Search is case-insensitive.
- Empty search returns paginated products.
- Multiple filters can be combined.
- Product data is loaded from the application's mock/static dataset.
- Pagination is performed on the server.

---

# Trade-offs

To keep the implementation simple and maintainable:

- Used a lightweight weighted ranking algorithm instead of Elasticsearch or BM25.
- Used an in-memory/mock dataset instead of a database.
- Implemented offset-based pagination.
- Prioritized clean architecture and readability over unnecessary complexity.

---

# Future Improvements

- Elasticsearch integration
- Redis caching
- Fuzzy search
- Search suggestions
- Synonym support
- Highlight matching terms
- Infinite scrolling
- Sorting options
- Search analytics
- CI/CD pipeline
- Production deployment

---

# Docker

The project includes Docker support for both frontend and backend.

Each service has its own Dockerfile, and the application can be started using Docker Compose.

```bash
docker compose up --build
```

This creates isolated containers for both services, ensuring a consistent development environment across different machines.

---

# Author

**Abhishek Singh Chauhan**
