import { useState } from 'react';
import { useApp } from '../store';
import { go } from '../router';
import { Btn, Card, Field, Grid, H, Row, Split, Stat, Table, Tag, useForm } from '../components/ui';
import { LibForm } from './library';

const TABS = ['schedule', 'videos', 'assignments', 'tasks'];
const LABEL = { schedule: 'meeting', videos: 'video', assignments: 'assignment', tasks: 'task' };

export function TDash() {
  const { s } = useApp();
  const subs = Object.entries(s.classes).flatMap(([cid, k]) => k.assignments.filter((a) => a.status === 'submitted').map((a) => ({ ...a, cid })));
  return (
    <>
      <Grid n={4}>
        <Stat label="Classes" v={Object.keys(s.classes).length} c="#14284b" />
        <Stat label="Students" v={s.students.length} c="#1e4d3a" />
        <Stat label="New submissions" v={subs.length} c="#b3261e" />
        <Stat label="Messages" v={s.threads.length} />
      </Grid>
      <Grid n={2}>
        <Card><H>Today</H>{(s.classes.web?.schedule || []).slice(0, 2).map((m, i) => <Row key={i} title={`Web Development · ${m.day} ${m.time}`} sub="Zoom" />)}</Card>
        <Card><H>Recent submissions</H>{subs.length ? subs.map((a) => <Row key={a.cid + a.id} title={a.title} sub={a.answer || 'file attached'} right={<Tag c="g1">grade</Tag>} />) : <small>No submissions yet.</small>}</Card>
      </Grid>
    </>
  );
}

export function TClass() {
  const { s, up, say } = useApp();
  const [cid, setCid] = useState('web');
  const [tab, setTab] = useState('schedule');
  const { f, setF, bind } = useForm({ a: '', b: '' });
  const k = s.classes[cid] || { schedule: [], videos: [], assignments: [], tasks: [] };
  const cname = s.courses.find((c) => c.id === cid)?.name;
  const add = () => {
    if (!f.a.trim()) return say('Enter the details first');
    up((x) => {
      const c = (x.classes[cid] ||= { schedule: [], videos: [], assignments: [], tasks: [] });
      c[tab].push(tab === 'schedule' ? { day: f.a, time: f.b || '4:00 PM', req: 'Bring your laptop' }
        : tab === 'videos' ? { t: f.a }
        : tab === 'assignments' ? { id: 'a' + Date.now(), title: f.a, due: f.b || 'Fri', q: 'See instructions in class.', status: 'open', answer: '' }
        : { t: f.a, done: false });
      x.notifications.unshift({ id: Date.now(), t: `New ${LABEL[tab]} in ${cname}: ${f.a}`, time: 'just now', read: false, to: '/classroom/' + cid });
    });
    setF({ a: '', b: '' }); say('Added and class notified');
  };
  const text = (i) => i.day ? `${i.day} ${i.time}` : i.title || i.t;
  return (
    <>
      <Field label="Class" value={cid} onChange={(e) => setCid(e.target.value)} options={s.courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)} />
      <div className="chips">{TABS.map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
      <Split>
        <Card>{k[tab].length ? k[tab].map((i, n) => <Row key={n} title={text(i)} sub={i.req || (i.due && 'Due ' + i.due) || ''} />) : <small>Nothing added yet.</small>}</Card>
        <Card>
          <H>Add {LABEL[tab]}</H>
          <Field label={tab === 'schedule' ? 'Day' : 'Title / text'} {...bind('a')} />
          {(tab === 'schedule' || tab === 'assignments') && <Field label={tab === 'schedule' ? 'Time' : 'Due'} {...bind('b')} />}
          <Btn onClick={add}>add and notify class</Btn>
        </Card>
      </Split>
    </>
  );
}

export function TStudents() {
  const { s } = useApp();
  const prog = [70, 45, 88, 60];
  return <Table head={['Name', 'Reg no', 'Courses', 'Progress', '']} rows={s.students.map((st, i) => [st.name, st.reg, st.courses, prog[i % 4] + '%', <Btn key="m" v="b" onClick={() => go('/t/messages')}>message</Btn>])} />;
}

export function TMessages() {
  const { s, up, say } = useApp();
  const [id, setId] = useState(s.threads[0]?.id);
  const [txt, setTxt] = useState('');
  const t = s.threads.find((a) => a.id === id);
  const reply = () => { if (!txt.trim()) return; up((x) => x.threads.find((a) => a.id === id).msgs.push({ me: true, t: txt })); setTxt(''); };
  const notify = () => { up((x) => x.notifications.unshift({ id: Date.now(), t: 'Message from your teacher', time: 'just now', read: false, to: '/classroom/web' })); say('Class notified'); };
  return (
    <Split>
      <Card>{s.threads.map((x) => <Row key={x.id} title={x.from} sub={x.msgs[x.msgs.length - 1].t} onClick={() => setId(x.id)} dot={x.id === id} />)}</Card>
      <Card>
        {t ? (
          <>
            <H>{t.from}</H>
            {t.msgs.map((m, i) => <div key={i} className={'bubble' + (m.me ? ' me' : '')}>{m.t}</div>)}
            <Field label="Reply" value={txt} onChange={(e) => setTxt(e.target.value)} />
            <Btn v="b" onClick={reply}>send</Btn> <Btn v="o" onClick={notify}>notify whole class</Btn>
          </>
        ) : <small>No messages.</small>}
      </Card>
    </Split>
  );
}

export function TUpload() {
  const { s, up, say } = useApp();
  const mine = s.library.filter((i) => i.by === s.user?.name);
  const submit = (f) => {
    up((x) => x.library.push({ id: Date.now(), title: f.title, type: 'pdf', access: f.access, price: Number(f.price) || 0, subject: f.subject, level: f.level, topic: f.topic, category: f.category, purpose: f.purpose, download: f.download === 'yes', status: 'pending', by: x.user.name }));
    say('Sent to admin for approval');
  };
  return (
    <>
      <LibForm label="submit for admin approval" onSubmit={submit} />
      <H>My uploads</H>
      <Card>{mine.length ? mine.map((i) => <Row key={i.id} title={i.title} right={<Tag c={i.status === 'published' ? 'g1' : 'rd'}>{i.status}</Tag>} />) : <small>No uploads yet.</small>}</Card>
    </>
  );
}
