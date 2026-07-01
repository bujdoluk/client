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
- [ApexCharts](https://apexcharts.com/) — charts (donut chart in roadmap sidebar)
- [Cypress](https://www.cypress.io/) — E2E and component testing
- [Vitest](https://vitest.dev/) — unit testing
- [ESLint](https://eslint.org/) — linting

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- A [Firebase](https://firebase.google.com/) project (Auth, Firestore and Storage enabled) if you need to run against your own backend
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`) for deployment
- [Docker](https://www.docker.com/) (optional, for the containerized build)

## Project Structure

```
src/
│
├── assets/                          Static images and icons
│   ├── avatar.png                   Default user avatar fallback
│   ├── feedback-logo.png            App logo used in toolbar and landing page
│   ├── magnifier.jpg                Illustration used on the landing page
│   ├── Amazon_logo.svg.png          Trusted-by logo
│   ├── Facebook_icon.svg.png        Trusted-by logo
│   └── 640px-Gayglers_2013_logo...  Trusted-by logo
│
├── components/                      Reusable UI components (one folder per component)
│   ├── AppToolbar/
│   │   └── AppToolbar.vue           Top navigation bar with logo, language select,
│   │                                theme toggle, auth buttons and avatar menu
│   ├── Auth/
│   │   ├── LogIn.vue                Email/password + Google + Facebook + anonymous login form
│   │   └── SignUp.vue               User registration form with email/password
│   ├── AvatarMenu/
│   │   └── AvatarMenu.vue           Dropdown menu showing user name, email, edit account and logout
│   ├── CommentCard/
│   │   └── CommentCard.vue          Displays a single comment with avatar, date and inline reply form
│   ├── ConfirmationDialog/
│   │   └── ConfirmationDialog.vue   Reusable "are you sure?" dialog exposed via open() method
│   ├── CookieConsent/
│   │   └── CookieConsent.vue        Bottom-fixed cookie banner; persists choice in localStorage
│   │                                and writes analytics data to Firestore when accepted
│   ├── Dialogs/
│   │   └── FeedbackDialog.vue       Create / edit feedback dialog with title, description,
│   │                                category and status fields
│   ├── EditAccount/
│   │   └── EditAccount.vue          Inline form to update display name, email and password
│   ├── EmptyFeedback/
│   │   └── EmptyFeedback.vue        Empty-state illustration shown when no feedbacks exist
│   ├── FeedbackBar/
│   │   └── FeedbackBar.vue          Feedback list item with upvote button, status chip,
│   │                                title, description, category tag, comment count and pin
│   ├── FeedbackCard/
│   │   └── FeedbackCard.vue         Card variant of a feedback item (used in roadmap columns)
│   ├── FrontendMentorBox/
│   │   └── FrontendMentorBox.vue    Sidebar card showing the app name and subtitle
│   ├── GoBackButton/
│   │   └── GoBackButton.vue         Back-navigation button using router.back()
│   ├── LanguageSelect/
│   │   └── LanguageSelect.vue       Dropdown to switch the active i18n locale
│   ├── LoaderOverlay/
│   │   └── LoaderOverlay.vue        Full-screen overlay shown during global loading state (useAppStore.isLoading)
│   ├── ModerationDialog/
│   │   └── ModerationDialog.vue     Dialog for approving/rejecting feedback or comments
│   ├── ModerationToggle/
│   │   └── ModerationToggle.vue     Toggle switch to enable/disable moderation mode
│   ├── ReplyCard/
│   │   └── ReplyCard.vue            Displays a single reply with avatar, date and mention
│   ├── RoadmapBox/
│   │   └── RoadmapBox.vue           Sidebar card showing planned/in-progress/live counts
│   │                                with an ApexCharts donut chart and status legend
│   ├── SortingPanel/
│   │   └── SortingPanel.vue         Top bar above feedback list with total count, sort select
│   │                                and "Add Feedback" button
│   ├── TagItem/
│   │   └── TagItem.vue              Tonal chip displaying a feedback category
│   ├── TagsBox/
│   │   └── TagsBox.vue              Sidebar card with category filter chips
│   ├── ThemeSelect/
│   │   └── ThemeSelect.vue          Button to toggle between light and dark theme
│   └── VotersCard/
│       └── VotersCard.vue           Sidebar card listing users who have voted
│
├── constants/
│   └── index.ts                     Frozen object with app-wide constants:
│                                    PAGE_SIZE (6), TEXT_MAX_LENGTH (1000),
│                                    TITLE_MAX_LENGTH (100), skeleton counts,
│                                    textarea row counts, snackbar timeout
│
├── firebase/
│   └── init.ts                      Firebase compat SDK initialisation (Auth, Firestore,
│                                    Storage, Performance); exports auth, db, storage,
│                                    increment, decrement, timestamp, firebase
│
├── locales/                         Vue I18n translation files
│   ├── English.json
│   ├── Czech.json
│   ├── Slovak.json
│   ├── German.json
│   └── French.json
│
├── plugins/
│   ├── auth.ts                      Composables for email/password login, signup, logout
│   │                                and anonymous (skip) sign-in via Firebase Auth
│   ├── datetime.ts                  formatFirestoreTimestamp() helper using the native Temporal API
│   ├── error.ts                     Global error handler — logs and shows snackbar messages
│   ├── i18n.ts                      Vue I18n plugin setup with all locale files registered
│   ├── storage.ts                   Firebase Storage helpers for uploading and downloading
│   │                                profile pictures
│   └── vuetify.ts                   Vuetify plugin configuration: theme colours, defaults,
│                                    icon set (@mdi/js)
│
├── router/
│   └── index.ts                     Vue Router setup with lazy-loaded routes and an
│                                    authGuard that redirects unauthenticated users to /error
│                                    Routes: / (landing), /login, /signup, /suggestions,
│                                    /suggestions/:id, /roadmap, /changelog,
│                                    /terms, /gdpr, /privacy, /error
│
├── stores/
│   ├── useAppStore.ts               Global Pinia store: isLoading (overlay), isModerationAllowed,
│   │                                showCreateReply, activeFormId (one-open-at-a-time reply forms)
│   └── useSnackBarStore.ts          Pinia store for the app-wide snackbar notification (show/hide/message)
│
├── styles/
│   └── settings.scss                Vuetify SCSS variable overrides
│
├── types/
│   ├── index.ts                     Shared TypeScript interfaces (Feedback, Comment, Reply, User)
│   │                                and the Status enum (Planned | InProgress | Live);
│   │                                Firestore Timestamp fields typed as firebase.firestore.Timestamp
│   └── temporal.d.ts                Ambient type declarations for the native Temporal API
│                                    (Instant, PlainDate, ZonedDateTime, Now namespace)
│
├── views/
│   ├── LandingPage/
│   │   └── LandingPageView.vue      Public marketing page: navbar, hero, trusted-by logos,
│   │                                feature overview, blog posts (i18n), footer with legal links
│   │                                and CookieConsent component
│   ├── ChangelogView.vue            Lists all feedbacks with Live status sorted by newest first
│   ├── ErrorView.vue                Generic error page with a link back to suggestions
│   ├── FeedbackDetailView.vue       Full feedback detail: upvote bar, comments, replies,
│   │                                add-comment form, edit and delete (with confirmation dialog)
│   ├── GdprView.vue                 GDPR / data processing notice page
│   ├── PrivacyPolicyView.vue        Privacy policy page
│   ├── RoadmapView.vue              Kanban-style roadmap with Planned / In-Progress / Live columns
│   ├── SuggestionsView.vue          Main feedback list: sidebar (tags, roadmap box, voters),
│   │                                paginated + sortable feedback list with 500 ms sort debounce
│   ├── TermsOfUseView.vue           Terms of use page
│   └── TestView.vue                 Development sandbox view (not linked in production routing)
│
├── App.vue                          Root component: AppToolbar, LoaderOverlay, router-view, Snackbar
├── main.ts                          App entry point — creates Vue app, registers Vuetify, Pinia,
│                                    Router and I18n plugins, mounts to #app
├── style.css                        Global CSS: input placeholder padding for plain-variant fields,
│                                    hover/focus ring styles for v-input, option-item list styles
└── vite-env.d.ts                    Triple-slash reference for vite/client types (ImportMeta.env)

cypress/                             E2E and component test specs
firestore.rules                      Firestore security rules
firestore.indexes.json               Firestore composite index definitions
storage.rules                        Firebase Storage security rules
firebase.json                        Firebase Hosting config (public: dist), Firestore and Storage rule pointers
.firebaserc                          Firebase project alias (feedback-app-a6506)
Dockerfile                           Multi-stage Docker build: Node build → Nginx static server
docker-compose.yml                   Docker Compose for local containerised preview
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_APP_BASE=/
   VITE_APP_HOST=0.0.0.0
   VITE_APP_PORT=3000
   VITE_APP_CONFIG=config.json
   VITE_COVERAGE=false
   ```

   Firebase credentials are configured in [src/firebase/init.ts](src/firebase/init.ts).
   Replace the `firebaseConfig` object there if you are pointing at your own project.

3. Start the dev server:

   ```bash
   npm run serve
   ```

   The app will be available at `http://localhost:3000`.

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

## Building & Deploying to Firebase

### 1. Install the Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Log in to Firebase

```bash
firebase login
```

### 3. Build the app

```bash
npm run build
```

This type-checks the project and outputs a production-ready static build to `dist/`.

### 4. Deploy to Firebase Hosting

```bash
firebase deploy
```

This deploys the `dist/` folder to Firebase Hosting along with any updated
Firestore rules (`firestore.rules`) and Storage rules (`storage.rules`) as
defined in `firebase.json`.

To deploy only the hosting (skip rules):

```bash
firebase deploy --only hosting
```

To deploy only Firestore rules:

```bash
firebase deploy --only firestore:rules
```

The deployed app will be live at the URL shown in the CLI output
(`https://<your-project-id>.web.app`).

### Full deploy pipeline (single command)

```bash
npm run build && firebase deploy
```

### Docker

A `Dockerfile` and `docker-compose.yml` are provided for a containerized
build (Node build stage → static files served by Nginx):

```bash
docker-compose up --build
```

## Internationalization

Translations live in `src/locales/*.json`, one file per language (English,
Czech, Slovak, German, French). Add new keys to every locale file to keep
translations in sync across all languages.
