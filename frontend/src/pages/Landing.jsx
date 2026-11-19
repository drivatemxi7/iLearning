import { useApp } from '../store';
import { go } from '../router';
import { Btn, Tag } from '../components/ui';

export const accessTag = (i) =>
  i.access === 'free' ? <Tag c="g1">free</Tag> : i.access === 'paid' ? <Tag c="br">${i.price}</Tag> : <Tag c="bl">students</Tag>;

const TILES = [['3D', 't1'], ['graphics', 't2'], ['spreadsheet', 't3'], ['web dev', 't4']];

export default function Landing() {
  const { s } = useApp();
  const lib = s.library.filter((i) => i.status === 'published').slice(0, 3);
  return (
    <>
      <section className="hero">
        <h1>Learn skills that employers want</h1>
        <p>Beginner to industrial level courses with teachers</p>
        <div className="hero-actions">
          <Btn onClick={() => go('/registration')}>register now</Btn>
          <Btn v="w" onClick={() => go('/explore')}>explore</Btn>
        </div>
      </section>

      <h4 className="sub">courses offered</h4>
      <div className="tiles">
        {TILES.map(([n, c]) => <button key={n} className={'tile ' + c} onClick={() => go('/registration')}>{n}</button>)}
      </div>

      <h4 className="sub">From the library</h4>
      <div className="libgrid">
        {lib.map((i) => (
          <div key={i.id} className="libcard" onClick={() => go('/library/' + i.id)}>
            <div className="thumb">{i.subject}</div>
            <div>{i.type}</div>
            {accessTag(i)}
          </div>
        ))}
      </div>
    </>
  );
}
