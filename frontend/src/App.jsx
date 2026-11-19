
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  GraduationCap,
  Users,
  Target,
} from 'lucide-react';

import Header from './components/Header.jsx';
import SideMenu from './components/SideMenu.jsx';
import AuthModal from './components/AuthModal.jsx';

import Courses from './pages/Courses.jsx';
import ThreeD from './pages/ThreeD.jsx';
import Graphics from './pages/Graphics.jsx';
import Spreadsheet from './pages/Spreadsheet.jsx';
import WebDevelopment from './pages/WebDevelopment.jsx';
import Library from './pages/Library.jsx';
import MyLearning from './pages/MyLearning.jsx';
import Profile from './pages/Profile.jsx';

function HomePage({ openAuth }) {
  return (
    <>
      <main id="home">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              PRACTICAL SKILLS. REAL OPPORTUNITIES.
            </span>

            <h1>
              Learn skills that<br />
              <em>move you forward.</em>
            </h1>

            <p className="hero-lead">
              Build practical, industry-relevant skills with guided
              courses, helpful resources and a community that wants
              to see you grow.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => openAuth('signup')}
              >
                Register now
              </button>

              <a className="btn btn-light" href="/courses">
                Explore courses
              </a>
            </div>

            <div className="hero-proof">
              <div className="proof-avatars">
                <span>M</span>
                <span>T</span>
                <span>A</span>
                <b>+</b>
              </div>

              <span>
                <strong>Learn at your pace</strong>
                <small>Start building skills today</small>
              </span>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />

            <div className="art-card art-card-main">
              <div className="art-top">
                <span className="live-dot" />
                LEARNING PATH
              </div>

              <div className="art-symbol">◈</div>

              <h3>
                Turn curiosity<br />
                into capability.
              </h3>

              <p>
                Small steps. Practical projects. New possibilities.
              </p>

              <div className="art-progress">
                <span />
                <span />
                <span />
                <span />
              </div>

              <small>YOUR JOURNEY STARTS HERE</small>
            </div>

            <div className="floating-card float-top">
              <span className="float-icon green-icon">
                <CheckCircle2 size={19} />
              </span>
              <span>
                <b>Keep growing</b>
                <small>One skill at a time</small>
              </span>
            </div>

            <div className="floating-card float-bottom">
              <span className="float-icon red-icon">
                <PlayCircle size={20} />
              </span>
              <span>
                <b>Learn by doing</b>
                <small>Practical lessons</small>
              </span>
            </div>

            <div className="art-stamp">
              <GraduationCap size={24} />
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div>
            <span className="strip-icon"><Target /></span>
            <span>
              <b>Practical learning</b>
              <small>Skills you can apply</small>
            </span>
          </div>

          <div>
            <span className="strip-icon"><BookOpen /></span>
            <span>
              <b>Useful resources</b>
              <small>Learn beyond the lesson</small>
            </span>
          </div>

          <div>
            <span className="strip-icon"><Users /></span>
            <span>
              <b>Guided community</b>
              <small>Grow with support</small>
            </span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark">
              <GraduationCap size={20} />
            </span>

            <span>
              LMDRP
              <small>LEARN • CREATE • GROW</small>
            </span>
          </a>

          <span>© 2026 LMDRP. Learn something meaningful.</span>

          <a href="/support">Contact & support</a>
        </div>
      </footer>
    </>
  );
}

function SimplePage({ title }) {
  return (
    <main className="section-wrap" style={{ minHeight: '75vh', paddingTop: 40 }}>
      <h1>{title}</h1>
    </main>
  );
}

function AppLayout() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const [notice, setNotice] = useState('');

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('lmdrp_user')) || null;
    } catch {
      return null;
    }
  });

  const openAuth = (mode) => setAuth(mode);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setAuth(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('lmdrp_access_token');
    sessionStorage.removeItem('lmdrp_user');

    setUser(null);
    setMenuOpen(false);
    setNotice('You have logged out successfully.');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <Header
        onMenu={() => setMenuOpen(true)}
        onAuth={openAuth}
        onProfile={() => navigate('/profile')}
        user={user}
        onLogout={handleLogout}
      />

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onAuth={openAuth}
        onNavigate={handleNavigation}
        user={user}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={<HomePage openAuth={openAuth} />}
        />

        <Route path="/courses" element={<Courses />} />
        <Route path="/3d" element={<ThreeD />} />
        <Route path="/graphics" element={<Graphics />} />
        <Route path="/spreadsheet" element={<Spreadsheet />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/library" element={<Library />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/registration" element={<SimplePage title="Registration" />} />
        <Route path="/classroom" element={<SimplePage title="Classroom" />} />
        <Route path="/assignments" element={<SimplePage title="Assignments" />} />
        <Route path="/calendar" element={<SimplePage title="Calendar" />} />
        <Route path="/explore" element={<SimplePage title="Explore" />} />
        <Route path="/support" element={<SimplePage title="Support us" />} />
        <Route path="/feedback" element={<SimplePage title="Feedback & contact" />} />

        <Route path="*" element={<SimplePage title="Page not found" />} />
      </Routes>

      {notice && (
        <div className="toast" role="status">
          {notice}
          <button onClick={() => setNotice('')}>
            ×
          </button>
        </div>
      )}

      {auth && (
        <AuthModal
          mode={auth}
          setMode={setAuth}
          onClose={() => setAuth(null)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
