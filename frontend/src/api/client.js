// Ready for the Postgres-backed API. The UI currently uses the mock store
// (src/store.jsx + src/data/mock.js). Replace store actions with api() calls
// when your backend is running.
const BASE = import.meta.env.VITE_API_URL || '/api';
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function api(path, { body, ...opts } = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
