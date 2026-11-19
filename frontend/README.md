# Learning Platform: Frontend (React + Vite)

Responsive web app (mobile and desktop) for the learning platform: account holder, student, teacher and admin areas, 29 screens.
The landing page, menu drawer and sign up/login follow your Figma design.

## Run in GitHub Codespaces (Docker)

1. Copy this folder into your repo (for example `frontend/`).
2. In a terminal: `cd frontend && cp .env.example .env && docker compose up --build`
3. Open the forwarded port **5173** (Codespaces shows a popup, or use the Ports tab).
4. Postgres starts on port 5432 (user/password/db come from `.env`). The UI does not use it yet.

Without Docker: `npm install && npm run dev`.

## Testing the interactions (demo mode)

There is no backend yet, so data lives in the browser (`localStorage`). On **sign up / login** use the
**Demo** chips: Account holder, Student, Teacher, Admin.

- Hamburger opens the side menu (on desktop the menu is a fixed sidebar). Bell opens notifications. The avatar opens your profile.
- Account holder: library items marked LOCKED open the "register now" prompt. Register (pick courses) and the admin must verify you.
- Admin: Students or Dashboard, press **verify**. Then switch back to the account holder and you get My Classes.
- Teacher: add a meeting, video, assignment or task. The class is notified, and the student sees it in notifications.
- Teacher library upload goes to the admin Library approval queue.
- To reset demo data: clear the site data for the page, or run `localStorage.clear()` in the browser console.

## Structure

```
src/
  main.jsx, App.jsx        entry and route table
  router.js                tiny hash router (no extra dependency)
  store.jsx                app state, localStorage persistence, toasts
  data/mock.js             seed data (replace with API data)
  api/client.js            fetch helper for your Postgres API (VITE_API_URL, proxied at /api)
  components/              Layout (top bar, drawer, sidebar) and ui kit
  pages/                   Landing, Auth, student, library, misc, teacher, admin
  styles.css               all styles (colours at the top as CSS variables)
```

## Connecting the backend later

Each action in the pages calls `up(draft => ...)` from `store.jsx`. Replace those with `api('/endpoint', {...})`
calls from `src/api/client.js`, and set `VITE_USE_MOCK=false`. Add your API as a service in `docker-compose.yml`
(a commented example is included) so `http://api:4000` works through the `/api` proxy.
