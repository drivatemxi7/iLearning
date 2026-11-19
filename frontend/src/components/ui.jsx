import { useState } from 'react';
import { go } from '../router';

export const Card = ({ children, className = '', ...p }) => <div className={'card ' + className} {...p}>{children}</div>;
export const Tag = ({ c = '', children }) => <span className={'tag ' + c}>{children}</span>;
export const Btn = ({ v = 'g', full, className = '', ...p }) => <button className={`btn ${v} ${full ? 'full' : ''} ${className}`} {...p} />;
export const H = ({ children }) => <h3 className="h">{children}</h3>;
export const Grid = ({ n = 2, children }) => <div className={'grid g' + n}>{children}</div>;
export const Split = ({ children }) => <div className="split">{children}</div>;
export const Stat = ({ label, v, c = '#5c3d2e' }) => <Card className="stat" style={{ borderLeftColor: c }}>{label}<b>{v}</b></Card>;

export function Field({ label, area, options, ...p }) {
  return (
    <label className="fld">
      <span>{label}</span>
      {area ? <textarea rows={4} {...p} /> : options ? <select {...p}>{options}</select> : <input {...p} />}
    </label>
  );
}

export const Row = ({ title, sub, right, dot, onClick }) => (
  <div className={'row' + (onClick ? ' click' : '')} onClick={onClick}>
    {dot && <i className="dot" />}
    <div className="grow"><b>{title}</b>{sub && <small>{sub}</small>}</div>
    {right}
  </div>
);

export const Table = ({ head, rows }) => (
  <div className="tw">
    <table>
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

export function Modal({ children, onClose }) {
  return (
    <div className="scrim2" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export function Locked({ msg = 'Register and get verified by admin to access this page.' }) {
  return (
    <Card className="lockbox">
      <b>{msg}</b><br /><br />
      <Btn onClick={() => go('/registration')}>register now</Btn>
    </Card>
  );
}

export function useForm(init) {
  const [f, setF] = useState(init);
  const bind = (k) => ({ value: f[k], onChange: (e) => setF((p) => ({ ...p, [k]: e.target.value })) });
  return { f, setF, bind };
}

export const statusTag = (st) => <Tag c={{ verified: 'g1', confirmed: 'g1', active: 'g1', pending: 'rd', suspended: 'br', blocked: 'rd', published: 'g1' }[st] || ''}>{st}</Tag>;
