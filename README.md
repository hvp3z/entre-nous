# Le Middle - Paris Meeting Point Finder

A responsive, mobile-first web application that helps groups of up to 6 friends find optimal meeting locations in Paris (bars, restaurants, kid-friendly places) that are equidistant via metro/train for all participants.

## Features

- **Three Themes**: Bars, Restaurants, and Kid-friendly places
- **Smart Location Finding**: Finds venues equidistant (within 10-minute variance) for all participants
- **Public Transport Focused**: Uses only metro and train lines in Île-de-France
- **Bilingual**: French and English support
- **Mobile-First**: Optimized for use while traveling on metro

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Zustand, Leaflet
- **Backend**: Node.js, Express, TypeScript
- **APIs**: Google Places, IDFM Open Data, Navitia
- **Cache**: Redis

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Redis (optional, for caching)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd le-middle
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Start the development servers:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000
The backend API will be available at http://localhost:3001

## Project Structure

```
le-middle/
├── frontend/          # Next.js application
├── backend/           # Express API server
├── shared/            # Shared TypeScript types
└── docker-compose.yml # Local development (Redis)
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_PLACES_API_KEY` | Google Places API key for venue search |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key for geocoding |
| `NAVITIA_API_KEY` | Navitia API key for transit backup |
| `REDIS_URL` | Redis connection URL |
| `NEXT_PUBLIC_API_URL` | Backend API URL |

## License

MIT

