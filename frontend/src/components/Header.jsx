
import React from 'react';
import {
  Bell,
  Menu,
  GraduationCap,
} from 'lucide-react';

export default function Header({
  onMenu,
  onAuth,
  onProfile,
  user,
  onLogout,
}) {
  const initial =
    user?.fullName?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="topbar">
      <button
        className="icon-btn menu-trigger"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu size={23} />
      </button>

      <a className="brand" href="/">
        <span className="brand-mark">
          <GraduationCap size={21} />
        </span>

        <span>
          iLEARNING
          <small>LEARN  CREATE  GROW</small>
        </span>
      </a>

      <nav className="desktop-nav">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href="/library">Library</a>
      </nav>

      <div className="top-actions">
        {user ? (
          <>
            <button
              className="icon-btn notification"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <i />
            </button>

            <button
              className="avatar"
              aria-label="Open profile"
              onClick={onProfile}
              title="My profile"
            >
              {initial}
            </button>

            <span className="top-login">
              {user.fullName}
            </span>

            <button
              className="btn btn-outline top-register"
              onClick={onLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-outline top-login"
              onClick={() => onAuth('login')}
            >
              Log in
            </button>

            <button
              className="btn btn-primary top-register"
              onClick={() => onAuth('signup')}
            >
              Get started
            </button>
          </>
        )}
      </div>
    </header>
  );
}
