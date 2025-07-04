# Full-Stack Blog System

A fully Dockerized blog platform with:

- Frontend: Vite + React + Chakra UI + Redux
- Backend: NestJS + PostgreSQL + TypeORM + JWT Auth + CQRS
- Deployment: Docker + Docker Compose + Nginx

---

##  Features

### Frontend

-  Vite + React + Chakra UI
-  JWT login & register
-  Create, read, update, delete posts
-  Comment on posts
-  Search bar (client-side filtering)
-  Responsive design

### Backend

-  NestJS (modular)
-  JWT Auth with Passport
-  CQRS pattern with Commands & Queries
-  TypeORM PostgreSQL integration

---

## ⚙ Project Structure

```
SKY_Tech_Exam/
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .env
├── docker-compose.yml
```

---

## 🔧 Installation

### 1. Clone the repo

```bash
git clone <repo-url>
cd sky-tech-spa-bloger
```

### 2. Create environment files

#### backend/.env

```env
JWT_SECRET=secret123
JWT_EXPIRES_IN=6h
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=blog
```

#### frontend/.env

```env
VITE_API_URL=http://localhost:5000
VITE_PORT=3000
```

---
### 3. backend

```bash
$ cd backend
$ npm install

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### 4. frontend
```bash
$ cd frontend
$ npm install

```

## Compile and run the project
```bash
# development
$ npm run dev

# build
$ npm run build
```

## Swagger API Documentation

Interactive API documentation is available at:http://localhost:<PORT>/api
Note: The Swagger UI is protected with Basic Auth. Use credentials defined in your .env file:

Username: BASIC_AUTH_USER
Password: BASIC_AUTH_PASSWORD

#api endpoints
| Method | Endpoint                 | Description                    | Authentication |
| ------ | ------------------------ | ------------------------------ | -------------- |
| POST   | `/auth/register`         | Register a new user            | No             |
| POST   | `/auth/login`            | Login and receive JWT token    | No             |
| GET    | `/auth/me`               | Get current authenticated user | Bearer Token   |
| POST   | `/posts`                 | Create a new post              | Bearer Token   |
| GET    | `/posts`                 | Get list of all posts          | Bearer Token   |
| GET    | `/posts/:id`             | Get post by ID                 | Bearer Token   |
| PUT    | `/posts/:id`             | Update post by ID              | Bearer Token   |
| DELETE | `/posts/:id`             | Delete post by ID              | Bearer Token   |
| POST   | `/comments`              | Create a new comment           | Bearer Token   |
| GET    | `/comments/post/:postId` | Get all comments for a post    | Bearer Token   |
| DELETE | `/comments/:id`          | Delete comment by ID           | Bearer Token   |
## Docker Setup

### 1. docker-compose.yml

```yaml
version: "3.8"

services:
  backend:
    build: ./backend
    container_name: blog-backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=secret123
      - JWT_EXPIRES_IN=6h
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=blog
    depends_on:
      - postgres

  frontend:
    build:
      context: ./frontend
    container_name: blog-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  postgres:
    image: postgres:15
    container_name: blog-db
    restart: always
    environment:
      POSTGRES_DB: blog
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
```

### 2. Frontend nginx.conf (for SPA routing)

`frontend/nginx.conf`

```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }
}
```

### 3. Build and run containers

```bash
docker-compose up --build
```

---

## Access

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## Common Issues

| Issue                       | Fix                                                          |
| --------------------------- | ------------------------------------------------------------ |
| Port 80 already in use      | Change frontend port in compose and expose different port    |
| SPA routes like /login fail | Add `try_files $uri $uri/ /index.html;` in nginx config      |
| Bad Gateway in browser      | Check `VITE_API_URL`, container logs, and Nginx port routing |

---

_This project was built for a practical full-stack exam challenge._
