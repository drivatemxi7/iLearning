export const today = new Date().toISOString().slice(0, 10);
const lv = (b, r, a) => ({
  beginner: { offered: true, price: b },
  regular: { offered: true, price: r },
  advanced: { offered: false, price: a },
});
const item = (id, title, type, access, price, subject, level, topic, category, purpose, download = true, status = 'published', by = 'Admin') =>
  ({ id, title, type, access, price, subject, level, topic, category, purpose, download, status, by });

export const SEED_REG = {
  status: 'verified', date: '2026-09-03', regNo: 'REG/2026/0123', total: 100,
  items: [{ course: 'web', level: 'regular', pending: false }, { course: '3d', level: 'beginner', pending: false }, { course: 'graphics', level: 'advanced', pending: true }],
};

export const seed = {
  user: null,
  reg: null,
  purchased: [],
  completed: ['Computer Basics'],
  courses: [
    { id: 'web', name: 'Web Development', duration: '12 weeks', teacher: 'Mr. Okello', levels: lv(40, 60, 90) },
    { id: '3d', name: '3D Design', duration: '8 weeks', teacher: 'Mr. Bosco', levels: lv(45, 65, 95) },
    { id: 'graphics', name: 'Graphics', duration: '10 weeks', teacher: 'Ms. Achieng', levels: lv(35, 55, 85) },
    { id: 'sheet', name: 'Spreadsheet', duration: '6 weeks', teacher: 'Mr. Okello', levels: lv(30, 45, 70) },
  ],
  library: [
    item(1, 'Spreadsheet Basics', 'pdf', 'free', 0, 'spreadsheet', 'Beginner', 'Formulas', 'Notes', 'Class reference'),
    item(2, 'Web Dev Slides', 'ppt', 'paid', 5, 'web', 'Regular', 'HTML and CSS', 'Slides', 'Class reference', false),
    item(3, '3D Modeling Guide', 'pdf', 'students', 0, '3d', 'Regular', 'Modeling', 'Guide', 'Self study'),
    item(4, 'Graphics Intro Video', 'link', 'free', 0, 'graphics', 'Beginner', 'Basics', 'Video', 'Introduction'),
    item(5, 'CSS Notes', 'txt', 'free', 0, 'web', 'Beginner', 'CSS', 'Notes', 'Revision'),
    item(6, 'Advanced Excel', 'pdf', 'paid', 8, 'spreadsheet', 'Advanced', 'Pivot tables', 'Guide', 'Industrial skills', false),
    item(7, 'UI Basics', 'img', 'students', 0, 'graphics', 'Beginner', 'Layout', 'Poster', 'Reference'),
    item(8, 'Blender Starter', 'video', 'paid', 4, '3d', 'Beginner', 'Blender', 'Video', 'Practice'),
  ],
  notifications: [
    { id: 1, t: 'New assignment in Web Development', time: '10 min ago', read: false, to: '/assignment/web/a1' },
    { id: 2, t: 'Zoom schedule updated: 3D Design', time: '2 h ago', read: false, to: '/classroom/3d' },
    { id: 3, t: 'New course added: Cyber Basics', time: 'yesterday', read: true, to: '/calendar' },
  ],
  classes: {
    web: {
      schedule: [{ day: 'Tue', time: '4:00 PM', req: 'Laptop and VS Code' }, { day: 'Thu', time: '4:00 PM', req: 'Laptop' }],
      videos: [{ t: 'Lesson 1: HTML' }, { t: 'Lesson 2: CSS' }],
      assignments: [{ id: 'a1', title: 'Build a landing page', due: 'Fri', q: 'Create a responsive landing page using HTML and CSS.', status: 'open', answer: '' }],
      tasks: [{ t: 'Install tools', done: true }, { t: 'Read chapter 2', done: false }],
    },
    '3d': {
      schedule: [{ day: 'Wed', time: '5:00 PM', req: 'Blender installed' }],
      videos: [{ t: 'Intro to Blender' }],
      assignments: [{ id: 'a1', title: 'Model a chair', due: 'Mon', q: 'Model and render a simple chair.', status: 'open', answer: '' }],
      tasks: [{ t: 'Watch intro video', done: false }],
    },
  },
  events: [
    { d: '2026-11-20', t: 'General meeting' },
    { d: '2026-11-25', t: 'New course: Cyber Basics' },
    { d: '2026-12-02', t: 'Web Dev live class' },
    { d: '2026-12-10', t: 'Graduation day' },
  ],
  students: [
    { id: 's1', name: 'A. Nabirye', reg: 'REG/0145', courses: 'Spreadsheet', date: '2026-09-09', status: 'pending' },
    { id: 's2', name: 'P. Okot', reg: 'REG/0166', courses: 'Graphics', date: '2026-10-01', status: 'verified' },
    { id: 's3', name: 'J. Mugisha', reg: 'REG/0123', courses: 'Web Development', date: '2026-09-03', status: 'verified' },
  ],
  users: [
    { id: 'u1', name: 'K. Ssemu', email: 'k@gmail.com', status: 'active' },
    { id: 'u2', name: 'L. Auma', email: 'l@gmail.com', status: 'suspended' },
    { id: 'u3', name: 'R. Lule', email: 'r@gmail.com', status: 'active' },
  ],
  teachers: [
    { id: 't1', name: 'Mr. Okello', email: 'okello@mail.com', assigned: 'Web Development, Spreadsheet' },
    { id: 't2', name: 'Mr. Bosco', email: 'bosco@mail.com', assigned: '3D Design' },
    { id: 't3', name: 'Ms. Achieng', email: 'achieng@mail.com', assigned: 'Graphics' },
  ],
  payments: [
    { id: 'p1', who: 'A. Nabirye', amount: 30, method: 'Mobile money', status: 'pending' },
    { id: 'p2', who: 'P. Okot', amount: 85, method: 'Card', status: 'confirmed' },
  ],
  contributions: [{ id: 'c1', who: 'M. Opio', amount: 10 }, { id: 'c2', who: 'S. Kato', amount: 200 }],
  threads: [
    { id: 'm1', from: 'J. Mugisha', msgs: [{ me: false, t: 'Please check my work' }] },
    { id: 'm2', from: 'A. Nabirye', msgs: [{ me: false, t: 'Thank you sir' }] },
  ],
  feedback: [{ id: 'f1', from: 'J. Mugisha', t: 'Great classes' }, { id: 'f2', from: 'A. Nabirye', t: 'Add more videos' }],
  explore: [
    { id: 'e1', t: 'Our aim', kind: 'video', url: 'https://youtube.com' },
    { id: 'e2', t: 'Social media ad', kind: 'video', url: 'https://youtube.com' },
    { id: 'e3', t: 'Sister organisation', kind: 'site', url: 'https://example.org' },
    { id: 'e4', t: 'Useful link pack', kind: 'links', url: 'https://example.org' },
  ],
  settings: { phone: '+256 700 000 000', email: 'info@platform.org', social: 'Facebook, YouTube, Instagram', threshold: 100 },
};
