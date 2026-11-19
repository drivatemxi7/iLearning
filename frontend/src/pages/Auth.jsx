import { useState } from 'react';
import { useApp } from '../store';
import { go } from '../router';
import { SEED_REG } from '../data/mock';
import { Btn, Field, useForm } from '../components/ui';
import { api } from '../api/client';

const DEMO = [['holder', 'Account holder', 'Guest User'], ['student', 'Student', 'Jane Mugisha'], ['teacher', 'Teacher', 'Mr. Okello'], ['admin', 'Admin', 'Admin']];

export default function Auth() {
  const { s, up, say } = useApp();
  const [mode, setMode] = useState('signup');
  const { f, bind } = useForm({ name: '', phone: '', email: '', pw: '' });

  const enter = (role, name, email) => {
    up((x) => {
      x.user = { name, email, role, phone: f.phone };
      if (role === 'student' && !x.reg) x.reg = SEED_REG;
    });
    say('Welcome, ' + name);
    go(role === 'teacher' ? '/t' : role === 'admin' ? '/a' : '/');
  };
  const submit = async () => {
    if (!f.email || !f.pw) return say('Enter your gmail and password');
    try {
      const result = mode === 'signup'
        ? await api('/auth/register', {
            method: 'POST',
            body: {
              fullName: f.name || f.email.split('@')[0],
              email: f.email,
              phone: f.phone || undefined,
              password: f.pw,
            },
          })
        : await api('/auth/login', {
            method: 'POST',
            body: { email: f.email, password: f.pw },
          });

      const user = result.user;
      localStorage.setItem('accessToken', result.accessToken);
      up((x) => { x.user = { ...user, name: user.fullName }; });
      say('Welcome, ' + (user.fullName || user.email));
      go(user.role === 'TEACHER' ? '/t' : user.role === 'ADMIN' ? '/a' : '/');
    } catch (error) {
      say(error.message);
    }
  };

  return (
    <>
      <div className="authcard">
        <h4>create your account</h4>
        <div className="pills">
          <button className={'pill' + (mode === 'signup' ? ' on' : '')} onClick={() => setMode('signup')}>sign up</button>
          <button className={'pill' + (mode === 'login' ? ' on' : '')} onClick={() => setMode('login')}>login</button>
        </div>
        {mode === 'signup' && <Field label="full name" {...bind('name')} />}
        {mode === 'signup' && <Field label="phone" {...bind('phone')} />}
        <Field label="gmail" type="email" {...bind('email')} />
        <Field label="password" type="password" {...bind('pw')} />
        <Btn full onClick={submit}>{mode === 'signup' ? 'sign up' : 'login'}</Btn>
      </div>
      <div className="demo">
        <small>Demo mode (no backend yet): enter instantly as</small>
        <div className="chips">
          {DEMO.map(([r, l, n]) => <button key={r} onClick={() => enter(r, n, n.toLowerCase().replace(/[^a-z]/g, '') + '@gmail.com')}>{l}</button>)}
        </div>
      </div>
    </>
  );
}
