# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

All commands should be run from the `app/` directory:

```bash
# Install dependencies
npm install

# Start development server (with HMR)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

### Docker Development

From the project root:

```bash
# Start containerized dev environment (port 5173)
docker-compose up
```

## Architecture Overview

This is a Vue 3 SPA for a B2B manufacturers marketplace, built with Vite and styled with Tailwind CSS.

### Tech Stack
- **Vue 3** with Composition API (`<script setup>` syntax)
- **Vue Router** for client-side routing
- **Vite 7** as build tool
- **Tailwind CSS 3** for styling
- **Deployed to GitHub Pages** via GitHub Actions

### Project Structure

```
app/
├── src/
│   ├── components/    # Reusable Vue components
│   ├── views/         # Page-level components (one per route)
│   ├── router/        # Vue Router configuration
│   ├── assets/        # CSS and static assets
│   ├── App.vue        # Root component (Navbar + RouterView + Footer)
│   └── main.js        # Application entry point
├── public/            # Static files served as-is
└── dist/              # Production build output
```

### Import Alias

`@/` is aliased to `src/` - use for all imports:
```js
import Navbar from '@/components/Navbar.vue'
```

### Routing

Routes are defined in `app/src/router/index.js`. Key routes:
- `/` - Home (featured manufacturers)
- `/directory` - Manufacturer directory with filters
- `/manufacturer/:id` - Manufacturer detail page
- `/admin` - Admin management panel
- `/dashboard` - Analytics dashboard

Base URL switches between `/manufacturer-marketplace/` (production) and `/` (development).

### Component Patterns

- **Views** (`src/views/`) are page-level components mapped to routes
- **Components** (`src/components/`) are reusable building blocks
- Communication uses props (down) and events (up)
- All styling uses Tailwind utility classes directly in templates

### Data Management

Currently uses local state with hardcoded data in components. No backend API or state management library (Vuex/Pinia) is integrated yet.

## Deployment

Push to `main` branch triggers GitHub Actions workflow (`.github/workflows/static.yml`) that builds and deploys to GitHub Pages.
