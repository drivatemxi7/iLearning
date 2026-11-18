# LMDRP Frontend

Responsive React + Vite frontend starter for the Learning Management and Digital Resource Platform (LMDRP).

## Included in this first frontend milestone

- Responsive landing page with hero section and course highlights
- Course cards for 3D/Blender, graphic design, Excel, and web development
- Learning library preview with working client-side search
- Slide-out navigation menu based on the supplied wireframe
- Sign-up and login modal with form validation and password visibility toggle
- Responsive desktop and mobile layouts

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/   Header, SideMenu, AuthModal
  data/         Sample course and library data
  App.jsx       Landing page and page composition
  main.jsx      React entry point
  styles.css    Responsive styling and design tokens
```

## Current implementation notes

This is the frontend milestone only. Authentication forms currently demonstrate the UI and client-side validation; they do not create accounts or authenticate users. Course registration, library access control, notifications, profile data, payments, and classroom content will need API integration in later milestones. The project is structured to connect to the planned NestJS backend and PostgreSQL database.
