import { useState } from 'react';
import { useApp, verify } from '../store';
import { Btn, Card, Field, Grid, H, Row, Split, Stat, Table, Tag, statusTag, useForm } from '../components/ui';
import { LibForm } from './library';

const bars = [35, 50, 42, 70, 85, 60];

export function ADash() {
  const { s, up, say } = useApp();
  const queue = s.students.filter((x) => x.status === 'pending');
  const pay = s.payments.filter((p) => p.status === 'pending').length;
  const revenue = s.payments.filter((p) => p.status === 'confirmed').reduce((a, p) => a + p.amount, 0);
  return (
    <>
      <Grid n={4}>
        <Stat label="Students" v={s.students.length} c="#14284b" />
        <Stat label="Accounts" v={s.users.length + s.students.length} />
        <Stat label="Pending payments" v={pay} c="#b3261e" />
        <Stat label="Revenue" v={'$' + revenue} c="#1e4d3a" />
      </Grid>
      <Split>
        <Card><H>Registrations per month</H><div className="bars">{bars.map((b, i) => <i key={i} style={{ height: b + '%' }} />)}</div></Card>
        <Card>
          <H>Verification queue</H>
          {queue.length ? queue.map((x) => <Row key={x.id} title={x.name} sub={x.courses} right={<Btn onClick={() => { up((d) => verify(d, x.id)); say(x.name + ' verified'); }}>verify</Btn>} />) : <small>Queue is empty.</small>}
        </Card>
      </Split>
    </>
  );
}

export function AUsers() {
  const { s, up } = useApp();
  const [q, setQ] = useState('');
  const set = (id, status) => up((x) => { x.users.find((u) => u.id === id).status = status; });
  const del = (id) => up((x) => { x.users = x.users.filter((u) => u.id !== id); });
  return (
    <>
      <input className="search" placeholder="Search users" value={q} onChange={(e) => setQ(e.target.value)} />
      <Table head={['Name', 'Email', 'Status', 'Actions']} rows={s.users.filter((u) => (u.name + u.email).toLowerCase().includes(q.toLowerCase())).map((u) => [
        u.name, u.email, statusTag(u.status),
        <span key="a" className="acts">
          <Btn v="o" onClick={() => set(u.id, u.status === 'active' ? 'suspended' : 'active')}>{u.status === 'active' ? 'suspend' : 'activate'}</Btn>
          <Btn v="r" onClick={() => set(u.id, 'blocked')}>block</Btn>
          <Btn v="o" onClick={() => del(u.id)}>remove</Btn>
        </span>,
      ])} />
    </>
  );
}

export function AStudents() {
  const { s, up, say } = useApp();
  return <Table head={['Name', 'Reg no', 'Courses', 'Registered', 'Status']} rows={s.students.map((x) => [x.name, x.reg, x.courses, x.date, x.status === 'pending' ? <Btn key="v" onClick={() => { up((d) => verify(d, x.id)); say(x.name + ' verified'); }}>verify now</Btn> : statusTag('verified')])} />;
}

export function ACourses() {
  const { s, up, say } = useApp();
  const { f, setF, bind } = useForm({ name: '', duration: '' });
  const toggle = (cid, l) => up((x) => { const o = x.courses.find((c) => c.id === cid).levels[l]; o.offered = !o.offered; });
  const teacher = (cid, v) => up((x) => { x.courses.find((c) => c.id === cid).teacher = v; });
  const add = () => {
    if (!f.name) return say('Enter a course name');
    up((x) => x.courses.push({ id: 'c' + Date.now(), name: f.name, duration: f.duration || '8 weeks', teacher: '-', levels: { beginner: { offered: true, price: 40 }, regular: { offered: true, price: 60 }, advanced: { offered: false, price: 90 } } }));
    setF({ name: '', duration: '' });
  };
  const rows = s.courses.flatMap((c) => ['beginner', 'regular', 'advanced'].map((l) => [
    c.name, l, c.duration,
    <button key="t" className="linkbtn" onClick={() => toggle(c.id, l)}>{c.levels[l].offered ? <Tag c="g1">offered</Tag> : <Tag c="rd">not yet offered</Tag>}</button>,
    l === 'beginner' ? <select key="s" value={c.teacher} onChange={(e) => teacher(c.id, e.target.value)}>{['-', ...s.teachers.map((t) => t.name)].map((n) => <option key={n}>{n}</option>)}</select> : '',
  ]));
  return (
    <Split>
      <Table head={['Course', 'Level', 'Duration', 'Status (tap to toggle)', 'Teacher']} rows={rows} />
      <Card><H>Add course</H><Field label="Title" {...bind('name')} /><Field label="Duration" placeholder="8 weeks" {...bind('duration')} /><Btn onClick={add}>save course</Btn></Card>
    </Split>
  );
}

export function ATeachers() {
  const { s, up, say } = useApp();
  const { f, setF, bind } = useForm({ name: '', email: '', assigned: '' });
  const add = () => { if (!f.name) return say('Enter a name'); up((x) => x.teachers.push({ id: 't' + Date.now(), ...f })); setF({ name: '', email: '', assigned: '' }); say('Teacher created'); };
  return (
    <Split>
      <Table head={['Name', 'Assigned', '']} rows={s.teachers.map((t) => [t.name, t.assigned, <Btn key="r" v="r" onClick={() => up((x) => { x.teachers = x.teachers.filter((a) => a.id !== t.id); })}>remove</Btn>])} />
      <Card><H>Create teacher</H><Field label="Name" {...bind('name')} /><Field label="Email" {...bind('email')} /><Field label="Assign to" placeholder="Course + level" {...bind('assigned')} /><Btn onClick={add}>create and assign</Btn></Card>
    </Split>
  );
}

export function APayments() {
  const { s, up, say } = useApp();
  return <Table head={['Student', 'Amount', 'Method', 'Status']} rows={s.payments.map((p) => [p.who, '$' + p.amount, p.method, p.status === 'pending' ? <Btn key="c" onClick={() => { up((x) => { x.payments.find((a) => a.id === p.id).status = 'confirmed'; }); say('Payment confirmed'); }}>confirm</Btn> : statusTag('confirmed')])} />;
}

export function ALibrary() {
  const { s, up, say } = useApp();
  const pending = s.library.filter((i) => i.status === 'pending');
  const publish = (f) => { up((x) => x.library.push({ id: Date.now(), title: f.title, type: 'pdf', access: f.access, price: Number(f.price) || 0, subject: f.subject, level: f.level, topic: f.topic, category: f.category, purpose: f.purpose, download: f.download === 'yes', status: 'published', by: 'Admin' })); say('Published'); };
  const decide = (id, ok) => up((x) => { if (ok) x.library.find((i) => i.id === id).status = 'published'; else x.library = x.library.filter((i) => i.id !== id); });
  return (
    <Split>
      <div><H>Upload item</H><LibForm label="publish" onSubmit={publish} /></div>
      <div>
        <H>Teacher approvals</H>
        <Card>{pending.length ? pending.map((i) => <Row key={i.id} title={i.title} sub={i.by} right={<span className="acts"><Btn onClick={() => decide(i.id, true)}>approve</Btn><Btn v="r" onClick={() => decide(i.id, false)}>reject</Btn></span>} />) : <small>No items waiting.</small>}</Card>
        <H>Published ({s.library.filter((i) => i.status === 'published').length})</H>
      </div>
    </Split>
  );
}

export function ABroadcast() {
  const { up, say } = useApp();
  const { f, setF, bind } = useForm({ to: 'registered', via: 'both', subject: '', msg: '' });
  const send = () => {
    if (!f.subject || !f.msg) return say('Add a subject and message');
    if (f.via !== 'email') up((x) => x.notifications.unshift({ id: Date.now(), t: f.subject, time: 'just now', read: false, to: '/' }));
    setF({ ...f, subject: '', msg: '' }); say('Message sent');
  };
  return (
    <Card style={{ maxWidth: 640 }}>
      <Field label="Audience" {...bind('to')} options={<><option value="registered">Registered students only</option><option value="all">All users</option></>} />
      <Field label="Send as" {...bind('via')} options={<><option value="both">Email + system notification</option><option value="email">Email only</option><option value="note">System notification only</option></>} />
      <Field label="Subject" {...bind('subject')} />
      <Field label="Message" area {...bind('msg')} />
      <Btn onClick={send}>send</Btn>
    </Card>
  );
}

export function AContrib() {
  const { s, up, say } = useApp();
  const [th, setTh] = useState(s.settings.threshold);
  const [msg, setMsg] = useState('');
  return (
    <Split>
      <Table head={['Donor', 'Amount', 'Email sent']} rows={s.contributions.map((c) => [c.who, '$' + c.amount, c.amount >= s.settings.threshold ? 'Thank you + admin will contact you' : 'Thank you'])} />
      <Card>
        <H>Settings</H>
        <Field label="Custom-message threshold ($)" type="number" value={th} onChange={(e) => setTh(e.target.value)} />
        <Btn v="b" onClick={() => { up((x) => { x.settings.threshold = Number(th); }); say('Saved'); }}>save</Btn>
        <br /><br />
        <Field label="Custom message to donors" area value={msg} onChange={(e) => setMsg(e.target.value)} />
        <Btn onClick={() => { setMsg(''); say('Message sent'); }} disabled={!msg.trim()}>send</Btn>
      </Card>
    </Split>
  );
}

export function ASite() {
  const { s, up, say } = useApp();
  const [set, setSet] = useState(s.settings);
  const { f, setF, bind } = useForm({ t: '', url: '' });
  const add = () => { if (!f.t) return; up((x) => x.explore.push({ id: 'e' + Date.now(), t: f.t, kind: 'site', url: f.url || 'https://example.org' })); setF({ t: '', url: '' }); };
  return (
    <>
      <Grid n={2}>
        <Card>
          <H>Explore content</H>
          {s.explore.map((e) => <Row key={e.id} title={e.t} right={<Btn v="r" onClick={() => up((x) => { x.explore = x.explore.filter((a) => a.id !== e.id); })}>remove</Btn>} />)}
          <Field label="New item title" {...bind('t')} /><Field label="URL" {...bind('url')} /><Btn v="o" onClick={add}>+ add</Btn>
        </Card>
        <Card>
          <H>Contacts and public links</H>
          <Field label="Phone" value={set.phone} onChange={(e) => setSet({ ...set, phone: e.target.value })} />
          <Field label="Email" value={set.email} onChange={(e) => setSet({ ...set, email: e.target.value })} />
          <Field label="Social links" value={set.social} onChange={(e) => setSet({ ...set, social: e.target.value })} />
          <Btn onClick={() => { up((x) => { x.settings = { ...x.settings, ...set }; }); say('Settings saved'); }}>save</Btn>
        </Card>
      </Grid>
      <H>Feedback inbox</H>
      <Table head={['From', 'Message']} rows={s.feedback.map((x) => [x.from, x.t])} />
    </>
  );
}
