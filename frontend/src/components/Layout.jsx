import { useState, useEffect } from 'react';
import { useApp } from '../store';
import { go } from '../router';

const USER = [['home', '/'], ['registration', '/registration'], ['my classes', '/classes'], ['classroom', '/classroom'], ['assignment', '/assignment'], ['library', '/library'], ['calendar', '/calendar'], ['explore', '/explore'], ['support us', '/support']];
const TEACH = [['dashboard', '/t'], ['classes', '/t/class'], ['students', '/t/students'], ['messages', '/t/messages'], ['library upload', '/t/upload']];
const ADMIN = [['dashboard', '/a'], ['users', '/a/users'], ['students', '/a/students'], ['courses', '/a/courses'], ['teachers', '/a/teachers'], ['payments', '/a/payments'], ['library', '/a/library'], ['broadcast', '/a/broadcast'], ['contributions', '/a/contrib'], ['settings', '/a/site']];

const Bell = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export default function Layout({ route, children }) {
  const { s, up, say, toast } = useApp();
  const [open, setOpen] = useState(false);
  const u = s.user;
  const items = u?.role === 'teacher' ? TEACH : u?.role === 'admin' ? ADMIN : USER;
  const unread = s.notifications.filter((n) => !n.read).length;
  const isAuth = route === '/auth';
  useEffect(() => setOpen(false), [route]);

  const on = (p) => (p === '/' ? route === '/' : route === p || route.startsWith(p + '/'));
  const logout = () => { up((x) => { x.user = null; }); say('Logged out'); go('/'); };
  const avatar = () => go(u ? '/profile' : '/auth');

  const menu = (
    <>
      <div className="dhead">
        <div>
          <h2>menu</h2>
          <b>{u ? u.name : 'guest'}</b>
          <small>{u ? u.email : 'not signed in'}</small>
        </div>
        <button className="avatar light" onClick={avatar}>{u ? u.name[0].toUpperCase() : '?'}</button>
      </div>
      {items.map(([label, path]) => (
        <button key={path} className={'mi' + (on(path) ? ' on' : '')} onClick={() => go(path)}>{label}</button>
      ))}
      {u ? <button className="mi out" onClick={logout}>logout</button> : <button className="mi out ok" onClick={() => go('/auth')}>sign up / login</button>}
      <button className="mi foot" onClick={() => go('/feedback')}>feedback &amp; contact</button>
    </>
  );

  return (
    <div className="shell">
      <aside className="side"><div className="brand2">LEARN</div>{menu}</aside>
      <div className="main">
        <header className="top">
          {isAuth ? <span className="title">sign up/login</span> : (
            <>
              <button className="burger" aria-label="Open menu" onClick={() => setOpen(true)}><i /><i /><i /></button>
              <span className="brand" onClick={() => go('/')}>LEARN</span>
            </>
          )}
          <span className="grow" />
          <button className="bell" aria-label="Notifications" onClick={() => go('/notifications')}>
            <Bell />{unread > 0 && <b />}
          </button>
          <button className="avatar" aria-label="Profile" onClick={avatar}>{u ? u.name[0].toUpperCase() : '?'}</button>
        </header>
        <main className="content">{children}</main>
      </div>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <nav className={'drawer' + (open ? ' open' : '')}>{menu}</nav>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
