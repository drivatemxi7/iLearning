import { useState } from 'react';
import { useApp } from '../store';
import { Btn, Card, Field, Grid, H, Row, Split, Tag, useForm } from '../components/ui';

const pad = (n) => String(n).padStart(2, '0');

export function Calendar() {
  const { s } = useApp();
  const [off, setOff] = useState(0);
  const [sel, setSel] = useState(null);
  const d = new Date(2026, 10 + off, 1);
  const y = d.getFullYear(), m = d.getMonth();
  const days = new Date(y, m + 1, 0).getDate();
  const key = (n) => `${y}-${pad(m + 1)}-${pad(n)}`;
  const ev = (n) => s.events.filter((e) => e.d === key(n));
  const cells = [...Array(d.getDay()).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <Split>
      <Card>
        <div className="row">
          <Btn v="o" onClick={() => setOff(off - 1)}>‹</Btn>
          <b className="grow center">{d.toLocaleString('en', { month: 'long', year: 'numeric' })}</b>
          <Btn v="o" onClick={() => setOff(off + 1)}>›</Btn>
        </div>
        <div className="cal">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((w, i) => <small key={i} className="center">{w}</small>)}
          {cells.map((n, i) => n === null ? <span key={i} /> : (
            <button key={i} className={'day' + (ev(n).length ? ' ev' : '') + (sel === n ? ' sel' : '')} onClick={() => setSel(n)}>
              {n}{ev(n).length > 0 && <i />}
            </button>
          ))}
        </div>
      </Card>
      <Card>
        <H>{sel ? `Events on ${key(sel)}` : 'Upcoming'}</H>
        {(sel ? ev(sel) : s.events).map((e, i) => <Row key={i} title={e.t} sub={e.d} />)}
        {sel && !ev(sel).length && <small>No events this day.</small>}
      </Card>
    </Split>
  );
}

export function Explore() {
  const { s } = useApp();
  return (
    <>
      <H>Our aim and updates</H>
      <Grid n={3}>
        {s.explore.map((e, i) => (
          <Card key={e.id}>
            <div className={'cimg t' + ((i % 4) + 1)}>{e.kind === 'video' ? '▶ ' : ''}{e.t}</div>
            <p><Tag c="bl">{e.kind}</Tag></p>
            <Btn v="o" onClick={() => window.open(e.url, '_blank')}>open</Btn>
          </Card>
        ))}
      </Grid>
    </>
  );
}

export function Support() {
  const { s, up, say } = useApp();
  const { f, bind } = useForm({ name: '', email: '', method: 'Mobile money' });
  const [amt, setAmt] = useState(10);
  const [done, setDone] = useState(null);
  const send = () => {
    if (!(amt > 0)) return say('Enter an amount');
    up((x) => x.contributions.push({ id: 'c' + Date.now(), who: f.name || 'Anonymous', amount: Number(amt) }));
    setDone(Number(amt));
  };
  return (
    <Split>
      <Card>
        <H>Support our mission</H>
        <div className="chips">{[5, 10, 50].map((a) => <button key={a} className={amt === a ? 'on' : ''} onClick={() => setAmt(a)}>${a}</button>)}</div>
        <Field label="Other amount ($)" type="number" value={amt} onChange={(e) => setAmt(e.target.value)} />
        <Field label="Your name" {...bind('name')} />
        <Field label="Email" type="email" {...bind('email')} />
        <Field label="Payment method" {...bind('method')} options={<><option>Mobile money</option><option>Card</option></>} />
        <Btn onClick={send}>contribute</Btn>
      </Card>
      <Card className="center thanks">
        {done ? (
          <>
            <div className="avatar big green">★</div>
            <H>Thank you for your ${done} gift!</H>
            <p>A thank-you email was sent to {f.email || 'your inbox'}.{done >= s.settings.threshold && ' Admin will contact you soon.'}</p>
          </>
        ) : <small>Your thank-you badge appears here after you contribute.</small>}
      </Card>
    </Split>
  );
}

export function Feedback() {
  const { s, up, say } = useApp();
  const { f, setF, bind } = useForm({ subject: '', msg: '' });
  const send = () => {
    if (!f.msg) return say('Write your feedback');
    up((x) => x.feedback.unshift({ id: 'f' + Date.now(), from: x.user?.name || 'Guest', t: `${f.subject}: ${f.msg}` }));
    setF({ subject: '', msg: '' }); say('Thank you for your feedback');
  };
  return (
    <Grid n={2}>
      <Card><H>Send feedback</H><Field label="Subject" {...bind('subject')} /><Field label="Message" area {...bind('msg')} /><Btn onClick={send}>send</Btn></Card>
      <Card>
        <H>Contact us</H>
        <Row title="Phone" sub={s.settings.phone} /><Row title="Email" sub={s.settings.email} /><Row title="Social links" sub={s.settings.social} />
      </Card>
    </Grid>
  );
}
