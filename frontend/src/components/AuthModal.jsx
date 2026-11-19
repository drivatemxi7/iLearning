
import React, { useState } from 'react';
import { X, ArrowRight, Eye, EyeOff, GraduationCap } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function AuthModal({ mode, setMode, onClose }) {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
const endpoint = mode === 'signup' ? '/auth/register' : '/auth/login';

      const payload =
        mode === 'signup'
          ? {
              fullName: form.name.trim(),
              phone: form.phone.trim() || undefined,
              email: form.email.trim(),
              password: form.password,
            }
          : {
              email: form.email.trim(),
              password: form.password,
            };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Authentication failed. Please try again.'
        );
      }

      if (!data.accessToken) {
        throw new Error('The server did not return an authentication token.');
      }

      sessionStorage.setItem('lmdrp_access_token', data.accessToken);
      sessionStorage.setItem('lmdrp_user', JSON.stringify(data.user));

      setDone(true);
    } catch (err) {
      setError(
        err.message || 'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setError('');
    setDone(false);
    setMode(nextMode);
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className="auth-modal">
        <button className="icon-btn modal-close" onClick={onClose}>
          <X />
        </button>

        <div className="auth-brand">
          <span className="brand-mark">
            <GraduationCap />
          </span>
          <span>LMDRP</span>
        </div>

        {done ? (
          <div className="success-state">
            <div className="success-icon">✓</div>
            <h2>{mode === 'signup' ? 'Account created!' : 'Welcome back!'}</h2>
            <p>
              {mode === 'signup'
                ? 'Your account has been successfully created.'
                : 'You have successfully logged in.'}
            </p>
            <button className="btn btn-primary full" onClick={onClose}>
              Continue
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>

            <h2>
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h2>

            <p className="auth-sub">
              {mode === 'signup'
                ? 'Join a community of people building practical skills.'
                : 'Log in to continue learning and access your classes.'}
            </p>

            <div className="auth-tabs">
              <button
                className={mode === 'signup' ? 'active' : ''}
                onClick={() => switchMode('signup')}
              >
                Sign up
              </button>
              <button
                className={mode === 'login' ? 'active' : ''}
                onClick={() => switchMode('login')}
              >
                Log in
              </button>
            </div>

            <form onSubmit={submit}>
              {mode === 'signup' && (
                <label>
                  Full name
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Enter your full name"
                    required
                  />
                </label>
              )}

              {mode === 'signup' && (
                <label>
                  Phone number (optional)
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="e.g. +265 9xx xxx xxx"
                  />
                </label>
              )}

              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Password
                <div className="password-wrap">
                  <input
                    name="password"
                    type={show ? 'text' : 'password'}
                    value={form.password}
                    onChange={update}
                    placeholder="Enter your password"
                    minLength={mode === 'signup' ? 10 : 1}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label="Toggle password visibility"
                  >
                    {show ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>

              {mode === 'login' && (
                <a className="forgot" href="#">
                  Forgot password?
                </a>
              )}

              {error && (
                <p className="auth-error" role="alert">
                  {error}
                </p>
              )}

              <button
                className="btn btn-primary full submit-auth"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? 'Please wait...'
                  : mode === 'signup'
                    ? 'Create account'
                    : 'Log in'}
                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="terms">
              By continuing, you agree to our <a href="#">Terms</a> and{' '}
              <a href="#">Privacy Policy</a>.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
