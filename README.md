# Vizeel Monorepo

A monorepo containing the Vizeel webapp and NestJS API server.

## Project Structure

```
vizeel-monorepo/
├── apps/
│   ├── webapp/          # React frontend application
│   └── server/          # NestJS API server
├── package.json         # Root package.json with workspace config
├── nest-cli.json        # NestJS CLI configuration
└── tsconfig.json        # Root TypeScript config
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (for the server)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp apps/server/.env.example apps/server/.env
   ```
   
   Update the `.env` file with your MongoDB connection string and other configuration.

## Development

### Run both applications concurrently:
```bash
npm run dev
```

### Run applications individually:

**Frontend only:**
```bash
npm run dev:webapp
```

**Backend only:**
```bash
npm run dev:server
```

## Building

### Build both applications:
```bash
npm run build
```

### Build individually:

**Frontend:**
```bash
npm run build:webapp
```

**Backend:**
```bash
npm run build:server
```

## Production

### Start the server:
```bash
npm run start:server
```

The webapp build files are static and can be served from any static file server.

## API Endpoints

The server runs on `http://localhost:4001` by default and provides:

- `GET /api/health` - Health check endpoint
- `GET /api` - Basic hello endpoint

## Technologies

### Frontend (webapp)
- React 18
- TypeScript
- Vite
- Tailwind CSS
- ShadCN/UI components
- React Router
- React Query

### Backend (server)
- NestJS
- TypeScript
- MongoDB with Mongoose
- Express (via NestJS)

## Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/vizeel
PORT=4001
FRONTEND_URL=http://localhost:8080
NODE_ENV=development
```
