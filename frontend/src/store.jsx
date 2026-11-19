import { createContext, useContext, useState, useCallback } from 'react';
import { seed } from './data/mock';

const Ctx = createContext(null);
const KEY = 'lp_state_v1';

const load = () => {
  try { return { ...seed, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch { return seed; }
};

export const isStudent = (s) => !!s.user && (s.user.role === 'student' || s.reg?.status === 'verified');

export function verify(x, id) {
  const st = x.students.find((a) => a.id === id);
  if (st) st.status = 'verified';
  if (id === 'me' && x.reg) x.reg.status = 'verified';
}

export function Provider({ children }) {
  const [s, set] = useState(load);
  const [toast, setToast] = useState('');
  // up(draft => { mutate draft }) keeps state immutable and persists to localStorage.
  const up = useCallback((fn) => set((p) => {
    const n = structuredClone(p);
    fn(n);
    try { localStorage.setItem(KEY, JSON.stringify(n)); } catch { /* storage unavailable */ }
    return n;
  }), []);
  const say = useCallback((m) => { setToast(m); setTimeout(() => setToast(''), 2400); }, []);
  return <Ctx.Provider value={{ s, up, say, toast, student: isStudent(s) }}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
