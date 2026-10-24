
# FitLog — Workout Library

FitLog is a responsive workout library and daily workout planner built with Next.js. It helps users explore exercises, review workout instructions, organize their daily sessions, and save exercises for later.

## Features

- **Workout Library:** Browse 12 exercises with images, muscle groups, equipment, difficulty, and workout statistics.
- **Workout Details:** View exercise descriptions, equipment requirements, sets, repetitions, and step-by-step instructions.
- **Today's Plan:** Add up to five workouts to a daily training plan and monitor total exercises, duration, and calories.
- **Saved Workouts:** Save exercises for later and manage them independently from today's plan.
- **Workout Tracking:** Mark planned exercises as completed, remove exercises, and receive toast notifications.
- **Search and Sorting:** Find workouts by name or equipment and sort the library by duration, calories, or rating.
- **Responsive Design:** Use the application on desktop, tablet, and mobile devices.
- **Persistent Storage:** Keep the plan, saved exercises, and completion status in browser localStorage.

## Technologies

- Next.js and the App Router
- React and JavaScript
- Tailwind CSS
- Lucide React icons
- React-Toastify notifications
- FitLog REST API
- Browser localStorage

## Getting Started

### Requirements

Install Node.js and npm before running the project.

### Installation

Clone your repository and enter its directory:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd B14-A6-Fit-Log
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

Verify that the application builds successfully:

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

## API

The application retrieves workout information from the FitLog API:

- Primary: https://api.abcz.workers.dev/api/fitlog
- Alternative: https://api.api-store.workers.dev/api/fitlog

The API provides workout images, muscle groups, equipment, difficulty, duration, calories, rating, and instructions.

## Data Persistence

Today's Plan and Saved workouts are stored in the browser using localStorage. This allows data to survive page reloads in the same browser. The data is not synchronized across browsers or devices.

## Deployment

This project deploys to Vercel or Netlify. Import the GitHub repository and let the platform detect Next.js; the build command is `npm run build`. Do not use a static export, because the pages fetch live workout data on every request.

Optional environment variable:

- `FITLOG_API_URL` — a workout API URL to try before the two built-in ones.

- **Live Demo:** Add the deployed URL after deployment.
- **GitHub Repository:** Add your repository URL.

## Main Application Structure

```text
src/app/
├── components/
│   ├── site-header.jsx
│   ├── site-footer.jsx
│   ├── toast-provider.jsx
│   ├── workout-actions.jsx
│   ├── workout-image.jsx
│   └── workout-library.jsx
├── lib/
│   └── fitlog.js
├── my-plan/
│   └── page.js
├── workout/
│   └── [id]/
│       └── page.js
├── error.js
├── loading.js
├── not-found.js
├── globals.css
├── layout.js
└── page.js
```

## Author

FitLog was developed as a web development assignment to practice React, Next.js routing, API integration, responsive design, browser storage, and Git version control.
