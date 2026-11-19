import { useState } from 'react';
import { useApp } from '../store';
import { go } from '../router';
import { today } from '../data/mock';
import { Btn, Card, Field, Grid, H, Locked, Modal, Row, Split, Tag, useForm } from '../components/ui';

const LEVELS = ['beginner', 'regular', 'advanced'];
const cname = (s, id) => s.courses.find((c) => c.id === id)?.name || id;
const emptyClass = { schedule: [], videos: [], assignments: [], tasks: [] };

export function Registration() {
  const { s, up, say } = useApp();
  const u = s.user;
  const { f, bind } = useForm({ uni: '', year: '', regno: '', name: u?.name || '', phone: u?.phone || '', guardian: '' });
  const [pick, setPick] = useState({});
  const items = Object.entries(pick).filter(([, l]) => l).map(([course, level]) => ({
    course, level, pending: !s.courses.find((c) => c.id === course).levels[level].offered,
  }));
  const price = (i) => s.courses.find((c) => c.id === i.course).levels[i.level].price;
  const total = items.filter((i) => !i.pending).reduce((a, i) => a + price(i), 0);

  if (s.reg) {
    return (
      <Card>
        <H>Your registration</H>
        <Row title={s.reg.regNo} sub={'Registered ' + s.reg.date} right={<Tag c={s.reg.status === 'verified' ? 'g1' : 'rd'}>{s.reg.status === 'verified' ? 'verified' : 'waiting for admin'}</Tag>} />
        {s.reg.items.map((i, k) => (
          <Row key={k} title={cname(s, i.course)} sub={i.level} right={<Tag c={i.pending ? 'rd' : 'g1'}>{i.pending ? 'pending (not yet offered)' : 'registered'}</Tag>} />
        ))}
        <br />
        {s.reg.status === 'verified' && <Btn onClick={() => go('/classes')}>go to my classes</Btn>}
      </Card>
    );
  }

  const submit = () => {
    if (!u) { say('Please sign up or login first'); return go('/auth'); }
    if (!f.name || !items.length) return say('Enter your name and choose a course');
    const regNo = f.regno || 'REG/' + Date.now().toString().slice(-6);
    up((x) => {
      x.reg = { status: 'submitted', date: today, regNo, items, total };
      x.students.unshift({ id: 'me', name: f.name, reg: regNo, courses: items.map((i) => i.course).join(', '), date: today, status: 'pending' });
      if (total) x.payments.unshift({ id: 'pme', who: f.name, amount: total, method: 'Mobile money', status: 'pending' });
    });
    say('Submitted. Waiting for admin verification.');
  };

  return (
    <Split>
      <div>
        <Card>
          <H>Your details</H>
          <Grid n={2}>
            <Field label="University attended" {...bind('uni')} />
            <Field label="Year attended" {...bind('year')} />
            <Field label="University reg. no." {...bind('regno')} />
            <Field label="Full name" {...bind('name')} />
            <Field label="Contact phone" {...bind('phone')} />
            <Field label="Guardian contact (optional)" {...bind('guardian')} />
          </Grid>
        </Card>
        <H>Choose courses</H>
        <Card>
          {s.courses.map((c) => (
            <div className="row" key={c.id}>
              <div className="grow"><b>{c.name}</b><small>{c.duration}</small></div>
              <select value={pick[c.id] || ''} onChange={(e) => setPick({ ...pick, [c.id]: e.target.value })}>
                <option value="">not selected</option>
                {LEVELS.map((l) => <option key={l} value={l}>{l}{c.levels[l].offered ? ` ($${c.levels[l].price})` : ' (not yet offered)'}</option>)}
              </select>
            </div>
          ))}
        </Card>
      </div>
      <Card className="summary">
        <H>Payment summary</H>
        {items.length === 0 && <small>No course selected yet.</small>}
        {items.map((i) => (
          <Row key={i.course} title={cname(s, i.course)} sub={i.level} right={i.pending ? <Tag c="rd">pending $0</Tag> : <b>${price(i)}</b>} />
        ))}
        <Row title="Total" right={<b>${total}</b>} />
        <br /><Btn full onClick={submit}>submit registration</Btn>
      </Card>
    </Split>
  );
}

const verified = (s) => (s.reg?.items || []).filter((i) => !i.pending);

export function MyClasses() {
  const { s, student } = useApp();
  if (!student) return <Locked />;
  return (
    <Grid n={3}>
      {verified(s).map((i) => {
        const c = s.courses.find((k) => k.id === i.course);
        const next = (s.classes[i.course] || emptyClass).schedule[0];
        return (
          <Card key={i.course}>
            <div className={'cimg ' + (i.course === 'web' ? 't4' : i.course === '3d' ? 't1' : i.course === 'graphics' ? 't2' : 't3')}>{c.name}</div>
            <p><b>{c.name}</b> <Tag c="bl">{i.level}</Tag><br /><small>Teacher: {c.teacher}</small><br /><small>Next: {next ? `${next.day} ${next.time}, Zoom` : 'to be announced'}</small></p>
            <Btn v="b" onClick={() => go('/classroom/' + i.course)}>open class</Btn>
          </Card>
        );
      })}
    </Grid>
  );
}

export function Classroom({ id }) {
  const { s, up, say, student } = useApp();
  const [msg, setMsg] = useState(null);
  if (!student) return <Locked />;
  if (!id) return <MyClasses />;
  const c = s.courses.find((k) => k.id === id);
  if (!c) return <Locked msg="Class not found." />;
  const k = s.classes[id] || emptyClass;
  const lvl = verified(s).find((i) => i.course === id)?.level;
  const toggle = (n) => up((x) => { (x.classes[id] ||= structuredClone(emptyClass)).tasks[n].done = !k.tasks[n].done; });
  const send = () => {
    up((x) => {
      let t = x.threads.find((a) => a.from === x.user.name);
      if (!t) { t = { id: 'm' + Date.now(), from: x.user.name, msgs: [] }; x.threads.push(t); }
      t.msgs.push({ me: false, t: msg });
    });
    say('Message sent to ' + c.teacher); setMsg(null);
  };
  return (
    <>
      <div className="hero dark">
        <h1>{c.name} {lvl && <small>· {lvl}</small>}</h1>
        <p>Teacher: {c.teacher} · {c.duration}</p>
        <div className="hero-actions">
          <Btn v="r" onClick={() => say('Opening Zoom meeting…')}>join Zoom</Btn>
          <Btn v="w" onClick={() => setMsg('')}>contact teacher</Btn>
        </div>
      </div>
      <Split>
        <div>
          <H>Meeting schedule</H>
          <Card>{k.schedule.length ? k.schedule.map((m, i) => <Row key={i} title={`${m.day} ${m.time}`} sub={'Requirements: ' + m.req} right={<Tag c="bl">Zoom link</Tag>} />) : <small>No meetings yet.</small>}</Card>
          <H>Videos</H>
          <Grid n={2}>{k.videos.map((v, i) => <div key={i} className={'vid t' + ((i % 4) + 1)} onClick={() => window.open('https://youtube.com', '_blank')}>▶ {v.t} (YouTube)</div>)}</Grid>
          <H>Assignments</H>
          <Card>{k.assignments.length ? k.assignments.map((a) => <Row key={a.id} title={a.title} sub={'Due ' + a.due} right={<Btn v="b" onClick={() => go(`/assignment/${id}/${a.id}`)}>{a.status === 'submitted' ? 'view' : 'submit'}</Btn>} />) : <small>No assignments.</small>}</Card>
        </div>
        <div>
          <H>Tasks to do</H>
          <Card>{k.tasks.length ? k.tasks.map((t, i) => <label key={i} className="task"><input type="checkbox" checked={t.done} onChange={() => toggle(i)} /> {t.t}</label>) : <small>No tasks.</small>}</Card>
        </div>
      </Split>
      {msg !== null && (
        <Modal onClose={() => setMsg(null)}>
          <H>Message {c.teacher}</H>
          <Field label="Your message" area value={msg} onChange={(e) => setMsg(e.target.value)} />
          <Btn onClick={send} disabled={!msg.trim()}>send</Btn>
        </Modal>
      )}
    </>
  );
}

export function Assignment({ cid, aid }) {
  const { s, up, say, student } = useApp();
  const [ans, setAns] = useState('');
  if (!student) return <Locked />;
  if (!cid) {
    const rows = verified(s).flatMap((i) => (s.classes[i.course]?.assignments || []).map((a) => ({ ...a, cid: i.course })));
    return (
      <Card>
        <H>Assignments</H>
        {rows.length ? rows.map((a) => <Row key={a.cid + a.id} title={a.title} sub={`${cname(s, a.cid)} · due ${a.due}`} right={<Tag c={a.status === 'submitted' ? 'g1' : 'rd'}>{a.status}</Tag>} onClick={() => go(`/assignment/${a.cid}/${a.id}`)} />) : <small>No assignments yet.</small>}
      </Card>
    );
  }
  const a = (s.classes[cid]?.assignments || []).find((x) => x.id === aid);
  if (!a) return <Locked msg="Assignment not found." />;
  const submit = () => {
    up((x) => { const t = x.classes[cid].assignments.find((y) => y.id === aid); t.status = 'submitted'; t.answer = ans; });
    say('Assignment submitted');
  };
  return (
    <Split>
      <Card>
        <H>{a.title} <Tag c="rd">due {a.due}</Tag></H>
        <p>{a.q}</p>
        {a.status === 'submitted' ? <><b>Your answer</b><p>{a.answer || '(file attached)'}</p></> : (
          <><Field label="Your answer" area value={ans} onChange={(e) => setAns(e.target.value)} /><Btn onClick={submit} disabled={!ans.trim()}>submit assignment</Btn></>
        )}
      </Card>
      <Card>
        <H>Status</H>
        <Row title={a.status === 'submitted' ? 'Submitted' : 'Not submitted'} right={<Tag c={a.status === 'submitted' ? 'g1' : 'br'}>{a.status}</Tag>} />
        <small>{cname(s, cid)}</small><br /><br />
        <Btn v="o" onClick={() => go('/classroom/' + cid)}>back to class</Btn>
      </Card>
    </Split>
  );
}

export function Notifications() {
  const { s, up } = useApp();
  const open = (n) => { up((x) => { x.notifications.find((a) => a.id === n.id).read = true; }); go(n.to); };
  return (
    <Card>
      <H>Notifications</H>
      {s.notifications.map((n) => <Row key={n.id} dot={!n.read} title={n.t} sub={n.time} onClick={() => open(n)} />)}
      <br /><Btn v="o" onClick={() => up((x) => x.notifications.forEach((n) => { n.read = true; }))}>mark all as read</Btn>
    </Card>
  );
}

export function Profile() {
  const { s, up, say } = useApp();
  const u = s.user;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(u?.name || '');
  if (!u) return <Locked msg="Please sign up or login to see your profile." />;
  const save = () => { up((x) => { x.user.name = name; }); setEdit(false); say('Profile updated'); };
  return (
    <Split>
      <Card className="center">
        <div className="avatar big">{u.name[0].toUpperCase()}</div>
        {edit ? <Field label="Full name" value={name} onChange={(e) => setName(e.target.value)} /> : <h3>{u.name}</h3>}
        <small>{u.email}</small><br />
        <small>Reg. no. {s.reg?.regNo || 'not registered'}</small><br />
        <small>Registered: {s.reg?.date || '-'}</small><br /><br />
        {edit ? <Btn onClick={save}>save</Btn> : <Btn v="o" onClick={() => setEdit(true)}>edit profile</Btn>}
      </Card>
      <div>
        <H>Registered courses</H>
        <Card>{s.reg ? s.reg.items.map((i, k) => <Row key={k} title={cname(s, i.course)} sub={i.level} right={<Tag c={i.pending ? 'rd' : 'g1'}>{i.pending ? 'pending' : 'registered'}</Tag>} />) : <small>None yet.</small>}</Card>
        <H>Completed courses</H>
        <Card>{s.completed.map((c) => <Row key={c} title={c} right={<Tag c="g1">completed</Tag>} />)}</Card>
      </div>
    </Split>
  );
}
