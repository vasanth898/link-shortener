# 🔗 Link Shortener

A full-stack URL shortening service with click analytics, built with **Spring Boot** and **Angular**.

---

## ✨ Features

- **URL Shortening**: Generate unique 8-character short codes for any valid URL.
- **Automatic Redirection**: Seamlessly redirects users from short URLs to the original destination.
- **Click Analytics**: Tracks click count, IP address, user agent, and timestamp for each visit.
- **Link Expiration**: Short links automatically expire after a configurable time period.
- **Dashboard**: View all created links with their status, click counts, and creation dates.

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Java 21** | Core language |
| **Spring Boot 4** | REST API framework |
| **Spring Data JPA** | Database ORM |
| **H2 / MySQL** | Database (development/production) |

### Frontend
| Technology | Purpose |
|------------|---------|
| **Angular 19** | SPA framework |
| **TypeScript** | Core language |
| **RxJS** | Reactive state management |

---

## 🏗️ Project Structure

```
linkshortener/
├── src/main/java/com/linkshortener/
│   ├── controller/       # REST API endpoints
│   ├── Service/          # Business logic
│   ├── Repository/       # Data access layer
│   ├── entity/           # JPA entities (UrlMapping, ClickLog)
│   ├── dto/              # Data transfer objects
│   ├── exception/        # Custom exception handling
│   └── config/           # CORS & app configuration
│
└── frontend/src/app/
    ├── components/       # Angular UI components
    │   ├── home/         # URL shortening form
    │   ├── dashboard/    # Link management view
    │   ├── header/       # Navigation
    │   └── notification/ # Toast notifications
    └── services/         # HTTP service layer
```

---

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Node.js 18+
- Maven

### Backend
```bash
# From root directory
./mvnw spring-boot:run
```
The API will be available at `http://localhost:8082`

### Frontend
```bash
cd frontend
npm install
npm run start
```
The app will be available at `http://localhost:4200`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/url/shorten` | Create a new short URL |
| `GET` | `/api/url/shorten/{shortCode}` | Redirect to original URL |
| `GET` | `/api/url/all` | Get all shortened URLs |

---

## 📊 Data Model

### UrlMapping
Stores the mapping between short codes and original URLs.
- `id`, `longUrl`, `shortCode`, `shortUrl`
- `clickCount`, `createdDate`, `expiresAt`, `linkStatus`

### ClickLog
Records analytics for each click event.
- `id`, `urlMapping`, `ipAddress`, `userAgent`, `clickedAt`

---

## 🐳 Docker

A `Dockerfile` is included for containerized deployment.

```bash
docker build -t link-shortener .
docker run -p 8082:8082 link-shortener
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
