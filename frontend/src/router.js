import { useState, useEffect } from 'react';

// Tiny hash router: no extra dependency, works on any static host.
export const go = (p) => { window.location.hash = '#' + p; window.scrollTo(0, 0); };

export function useRoute() {
  const get = () => window.location.hash.slice(1) || '/';
  const [r, setR] = useState(get);
  useEffect(() => {
    const f = () => setR(get());
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return r;
}

export function match(pattern, path) {
  const a = pattern.split('/'), b = path.split('/');
  if (a.length !== b.length) return null;
  const out = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i][0] === ':') out[a[i].slice(1)] = b[i];
    else if (a[i] !== b[i]) return null;
  }
  return out;
}
