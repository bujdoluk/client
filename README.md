# Feedback App

**Live app:** [feedback-app-a6506.web.app](https://feedback-app-a6506.web.app)

A product feedback management platform. Users can submit and vote on feature
requests, product teams can share a public roadmap of planned/in-progress
work, and publish a changelog to communicate updates — turning user feedback
into actionable product decisions.

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — dev server & build tool
- [Vuetify 3](https://vuetifyjs.com/) — UI component library
- [Vue Router](https://router.vuejs.org/) — routing
- [Pinia](https://pinia.vuejs.org/) — state management
- [Vue I18n](https://vue-i18n.intlify.dev/) — translations (English, Czech, Slovak, German, French)
- [Firebase](https://firebase.google.com/) — Auth, Firestore, Storage, Performance Monitoring, Hosting
- [Cypress](https://www.cypress.io/) — E2E and component testing
- [Vitest](https://vitest.dev/) — unit testing
- [ESLint](https://eslint.org/) — linting

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- A [Firebase](https://firebase.google.com/) project (Auth, Firestore and Storage enabled) if you need to run against your own backend
- [Docker](https://www.docker.com/) (optional, for the containerized build)

## Project Structure

```
src/
├── assets/        Static images used by components
├── components/    Reusable UI components, one folder per component
├── constants/     Shared app-wide constants
├── firebase/      Firebase SDK initialization
├── locales/       i18n translation files (English, Czech, Slovak, German, French)
├── plugins/       Vue app plugins (auth, i18n, vuetify, storage, error handling)
├── router/        Vue Router configuration and route guards
├── stores/        Pinia stores
├── styles/        Global styles
├── types/         Shared TypeScript types
├── views/         Top-level route components (pages)
└── main.ts         App entry point

cypress/           E2E and component tests
public/            Static assets served as-is
firestore.rules    Firestore security rules
storage.rules      Firebase Storage security rules
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with the following variables:

   ```env
   VITE_APP_BASE=/
   VITE_APP_HOST=0.0.0.0
   VITE_APP_PORT=3000
   VITE_APP_CONFIG=config.json
   VITE_COVERAGE=false
   ```

   `VITE_APP_HOST`/`VITE_APP_PORT` configure the Vite dev/preview server. Firebase
   project credentials are currently configured directly in
   [src/firebase/init.ts](src/firebase/init.ts) — update them there if you're
   pointing at your own Firebase project.

3. Run the dev server:

   ```bash
   npm run serve
   ```

   The app will be available at `http://localhost:3000` (or whatever
   `VITE_APP_PORT` you set).

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run serve` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint and auto-fix the codebase |
| `npm run lint:errors` | Lint without auto-fixing (used in CI) |
| `npm run cypress` | Open the Cypress test runner (E2E/component tests) |

## Testing

- **Unit tests**: [Vitest](https://vitest.dev/) — config in `vitest.config.ts`
- **E2E / component tests**: [Cypress](https://www.cypress.io/) — specs in `cypress/`, run via `npm run cypress`

## Building & Deployment

Production build:

```bash
npm run build
```

This type-checks the project and outputs a static build to `dist/`, which is
deployed to [Firebase Hosting](https://firebase.google.com/docs/hosting)
(see `firebase.json` / `.firebaserc`).

### Docker

A `Dockerfile` and `docker-compose.yml` are provided for a containerized
build (Node build stage → static files served by Nginx):

```bash
docker-compose up --build
```

## Internationalization

Translations live in `src/locales/*.json`, one file per language. Add new
keys to every locale file to keep translations complete.
