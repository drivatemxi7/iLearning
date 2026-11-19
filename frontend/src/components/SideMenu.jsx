
import React from 'react';
import {
  X,
  UserRound,
  ClipboardList,
  BookOpen,
  GraduationCap,
  Users,
  CalendarDays,
  Compass,
  HeartHandshake,
  MessageSquare,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';

const links = [
  ['Profile', UserRound, '/profile'],
  ['Registration', ClipboardList, '/registration'],
  ['My classes', GraduationCap, '/my-learning'],
  ['Classroom', Users, '/classroom'],
  ['Assignments', LayoutDashboard, '/assignments'],
  ['Library', BookOpen, '/library'],
  ['Calendar', CalendarDays, '/calendar'],
  ['Explore', Compass, '/explore'],
  ['Support us', HeartHandshake, '/support'],
  ['Feedback & contact', MessageSquare, '/feedback'],
];

export default function SideMenu({
  open,
  onClose,
  onAuth,
  onNavigate,
  user,
  onLogout,
}) {
  const displayName = user?.fullName || user?.name || 'Guest';
  const email = user?.email || '';

  const isAdmin = user?.role === 'ADMIN';

  const menuLinks = isAdmin
    ? [...links, ['Admin', ShieldCheck, '/admin']]
    : links;

  const handleNavigation = (event, path) => {
    event.preventDefault();
    onNavigate?.(path);
    onClose();
  };

  const handleLogout = () => {
    onClose();
    onLogout?.();
  };

  return (
    <>
      <div
        className={`scrim ${open ? 'show' : ''}`}
        onClick={onClose}
      />

      <aside className={`side-menu ${open ? 'open' : ''}`}>
        <div className="menu-head">
          <span className="eyebrow">YOUR LEARNING SPACE</span>

          <button
            className="icon-btn close-menu"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        <div className="profile-mini">
          <div className="avatar large">
            {user ? displayName.charAt(0).toUpperCase() : 'J'}
          </div>

          <div>
            <strong>{displayName}</strong>
            <small>{email || 'Not logged in'}</small>

            <span className="member-tag">
              {isAdmin
                ? 'Administrator'
                : user
                  ? 'Member account'
                  : 'Guest account'}
            </span>
          </div>
        </div>

        <div className="menu-label">MENU</div>

        <nav className="menu-links">
          {menuLinks.map(([label, Icon, path]) => (
            <a
              key={label}
              href={path}
              onClick={(event) => handleNavigation(event, path)}
            >
              <Icon size={17} />
              <span>{label}</span>

              {label === 'My classes' && (
                <span className="menu-count">0</span>
              )}
            </a>
          ))}
        </nav>

        <div className="menu-bottom">
          {user ? (
            <button onClick={handleLogout}>
              <LogOut size={17} />
              Log out
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onAuth('login');
              }}
            >
              <LogOut size={17} />
              Log in / Sign up
            </button>
          )}

          <p>
            Need a hand?{' '}
            <a
              href="/support"
              onClick={(event) => handleNavigation(event, '/support')}
            >
              Contact support
            </a>
          </p>

          <small>© 2026 iLearning</small>
        </div>
      </aside>
    </>
  );
}
