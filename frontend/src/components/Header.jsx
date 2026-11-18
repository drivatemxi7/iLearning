
import React from 'react';
import {
  Bell,
  Menu,
  GraduationCap
} from 'lucide-react';

export default function Header({ onMenu, onAuth }) {
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
          LMDRP
          <small>LEARN • CREATE • GROW</small>
        </span>
      </a>

      <nav className="desktop-nav">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href="/library">Library</a>
      </nav>

      <div className="top-actions">
        <button
          className="icon-btn notification"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <i />
        </button>

        <button
          className="avatar"
          aria-label="Account menu"
          onClick={onMenu}
        >
          J
        </button>

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
      </div>
    </header>
  );
}
