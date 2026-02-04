# Link Shortener Frontend

Angular frontend application for the Link Shortener service.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

### 3. Start Backend Server

Make sure your Spring Boot backend is running on `http://localhost:8082`

```bash
cd ../
mvnw spring-boot:run
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/          # UI Components
│   │   │   ├── header/          # Navigation header
│   │   │   ├── home/            # URL shortening form
│   │   │   ├── dashboard/       # Link dashboard
│   │   │   └── notification/    # Toast notifications
│   │   ├── services/            # API Services
│   │   │   ├── url-shortener.service.ts
│   │   │   └── notification.service.ts
│   │   ├── models/              # TypeScript interfaces
│   │   └── app.component.ts     # Root component
│   ├── styles.css               # Global styles
│   └── index.html               # Main HTML file
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies
└── tsconfig.json               # TypeScript config
```

## Features

- ✨ **URL Shortening** - Convert long URLs to short links
- 📋 **Copy to Clipboard** - One-click copy functionality
- 📊 **Analytics Tracking** - View click counts and metadata
- ⏰ **Expiration Display** - Shows when links expire
- 🎨 **Modern UI** - Gradient backgrounds with glassmorphism
- 📱 **Responsive Design** - Works on all devices
- 🔔 **Toast Notifications** - Success/error messages

## API Integration

The frontend connects to the Spring Boot backend API:

- **POST** `/api/url/shorten` - Create shortened URL
- **GET** `/api/url/shorten/{shortcode}` - Redirect to long URL
- **GET** `/api/url/health` - Health check

Base URL: `http://localhost:8082`

## Development

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Code Style

This project uses:
- **TypeScript** for type safety
- **Angular Standalone Components** for modern architecture
- **RxJS** for reactive programming
- **CSS Custom Properties** for theming

## CORS Configuration

The backend has been configured to accept requests from `http://localhost:4200`. If you change the frontend port, update the CORS configuration in `CorsConfig.java`.

## Troubleshooting

### Backend Connection Issues

If you see CORS errors:
1. Ensure the backend is running on port 8082
2. Check that `CorsConfig.java` is present in the backend
3. Restart both frontend and backend servers

### Port Already in Use

If port 4200 is already in use:
```bash
ng serve --port 4300
```

Then update the CORS configuration in the backend to allow `http://localhost:4300`.

## License

MIT
