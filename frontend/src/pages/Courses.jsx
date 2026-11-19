
import React, { useMemo, useState } from 'react';
import {
  Search,
  BookOpen,
  Clock3,
  GraduationCap,
  ArrowUpRight,
  Code2,
  Palette,
  Box,
  FileSpreadsheet,
  Layers3,
} from 'lucide-react';

const courseData = [
  {
    id: 1,
    title: 'Web Development',
    category: 'Technology',
    description: 'Learn to build modern websites using HTML, CSS and JavaScript.',
    level: 'Beginner',
    duration: '8 weeks',
    lessons: 24,
    icon: Code2,
    tone: 'web',
    topics: ['HTML & CSS', 'JavaScript', 'Responsive design'],
  },
  {
    id: 2,
    title: '3D Modelling',
    category: 'Design',
    description: 'Explore 3D modelling, object creation and digital visualization.',
    level: 'Beginner',
    duration: '6 weeks',
    lessons: 18,
    icon: Box,
    tone: 'three-d',
    topics: ['3D objects', 'Materials', 'Rendering'],
  },
  {
    id: 3,
    title: 'Graphic Design',
    category: 'Design',
    description: 'Develop visual communication skills and create attractive designs.',
    level: 'Beginner',
    duration: '6 weeks',
    lessons: 20,
    icon: Palette,
    tone: 'graphics',
    topics: ['Design principles', 'Typography', 'Visual layouts'],
  },
  {
    id: 4,
    title: 'Spreadsheet Skills',
    category: 'Productivity',
    description: 'Work with spreadsheets, formulas, tables and data analysis.',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 16,
    icon: FileSpreadsheet,
    tone: 'spreadsheet',
    topics: ['Formulas', 'Functions', 'Data analysis'],
  },
  {
    id: 5,
    title: 'Digital Productivity',
    category: 'Productivity',
    description: 'Improve your digital working skills with useful productivity tools.',
    level: 'Beginner',
    duration: '3 weeks',
    lessons: 12,
    icon: Layers3,
    tone: 'productivity',
    topics: ['Digital tools', 'File management', 'Workflows'],
  },
];

const categories = ['All courses', 'Technology', 'Design', 'Productivity'];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All courses');

  const filteredCourses = useMemo(() => {
    return courseData.filter((course) => {
      const matchesCategory =
        category === 'All courses' || course.category === category;

      const matchesSearch =
        `${course.title} ${course.description} ${course.topics.join(' ')}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <main className="courses-page">
      <style>{`
        .courses-page {
          width: 100%;
          min-height: 100vh;
          box-sizing: border-box;
          padding: 48px 24px 70px;
          background: #eeeee9;
          color: #101b49;
          overflow-x: hidden;
        }

        .courses-container {
          width: 100%;
          max-width: 1120px;
          margin: auto;
        }

        .courses-heading {
          margin-bottom: 28px;
        }

        .courses-heading .eyebrow {
          color: #a17b42;
          font-size: 11px;
          letter-spacing: 1.5px;
          font-weight: 700;
        }

        .courses-heading h1 {
          margin: 12px 0;
          font-size: clamp(30px, 5vw, 45px);
          line-height: 1.12;
          letter-spacing: -1.8px;
        }

        .courses-heading p {
          max-width: 560px;
          color: #788092;
          font-size: 14px;
          line-height: 1.7;
        }

        .courses-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .courses-search {
          display: flex;
          align-items: center;
          gap: 10px;
          width: min(360px, 100%);
          min-height: 46px;
          box-sizing: border-box;
          padding: 0 13px;
          border: 1px solid #dededb;
          border-radius: 9px;
          background: white;
          color: #81899a;
        }

        .courses-search input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #101b49;
          font-size: 13px;
        }

        .category-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .category-filters button {
          padding: 10px 13px;
          border: 1px solid #dededb;
          border-radius: 7px;
          background: white;
          color: #697184;
          font-size: 11px;
          cursor: pointer;
        }

        .category-filters button.active {
          border-color: #18234e;
          background: #18234e;
          color: white;
        }

        .courses-result-count {
          margin-bottom: 16px;
          color: #838a98;
          font-size: 12px;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .learning-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          border: 1px solid #e0e0dc;
          border-radius: 12px;
          background: white;
        }

        .learning-card-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 120px;
          padding: 20px;
          box-sizing: border-box;
        }

        .learning-card-banner.web {
          background: #e7edf7;
          color: #233d69;
        }

        .learning-card-banner.three-d {
          background: #eee9f5;
          color: #51406d;
        }

        .learning-card-banner.graphics {
          background: #f7eae5;
          color: #90543e;
        }

        .learning-card-banner.spreadsheet {
          background: #e8f1e8;
          color: #426b4a;
        }

        .learning-card-banner.productivity {
          background: #f3eee0;
          color: #856b34;
        }

        .course-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 55px;
          height: 55px;
          border: 1px solid currentColor;
          border-radius: 12px;
          background: rgba(255,255,255,.5);
        }

        .course-symbol svg {
          width: 27px;
          height: 27px;
        }

        .course-category-tag {
          padding: 7px 10px;
          border-radius: 20px;
          background: rgba(255,255,255,.65);
          font-size: 10px;
          font-weight: 600;
        }

        .learning-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 19px;
        }

        .learning-card-body h2 {
          margin: 0 0 9px;
          font-size: 18px;
          letter-spacing: -.4px;
        }

        .learning-card-body p {
          min-height: 62px;
          margin: 0;
          color: #808797;
          font-size: 12px;
          line-height: 1.7;
        }

        .course-meta {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          margin: 17px 0;
          color: #737c8e;
          font-size: 11px;
        }

        .course-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .course-topics {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }

        .course-topics span {
          padding: 6px 8px;
          border-radius: 5px;
          background: #f3f3f0;
          color: #687185;
          font-size: 10px;
        }

        .course-explore {
          width: 100%;
          margin-top: auto;
          padding: 12px;
          border: 1px solid #18234e;
          border-radius: 7px;
          background: #18234e;
          color: white;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .course-explore:hover {
          background: #2b396b;
        }

        .courses-empty {
          grid-column: 1 / -1;
          padding: 45px 15px;
          border: 1px dashed #c9c9c3;
          border-radius: 10px;
          text-align: center;
          color: #808797;
          font-size: 13px;
        }

        @media (max-width: 850px) {
          .courses-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .courses-page {
            padding: 35px 17px 50px;
          }

          .courses-toolbar {
            align-items: stretch;
          }

          .courses-search {
            width: 100%;
          }

          .category-filters {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 5px;
          }

          .category-filters button {
            flex: 0 0 auto;
          }

          .courses-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .learning-card-banner {
            min-height: 100px;
          }

          .learning-card-body p {
            min-height: auto;
          }
        }
      `}</style>

      <div className="courses-container">
        <div className="courses-heading">
          <span className="eyebrow">LEARN SOMETHING MEANINGFUL</span>

          <h1>Explore our courses.</h1>

          <p>
            Discover practical learning opportunities, develop useful
            digital skills and build confidence through guided learning.
          </p>
        </div>

        <div className="courses-toolbar">
          <div className="courses-search">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search courses or topics..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search courses"
            />
          </div>

          <div className="category-filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="courses-result-count">
          Showing {filteredCourses.length} course
          {filteredCourses.length !== 1 ? 's' : ''}
        </div>

        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const Icon = course.icon;

              return (
                <article className="learning-card" key={course.id}>
                  <div className={`learning-card-banner ${course.tone}`}>
                    <div className="course-symbol">
                      <Icon />
                    </div>

                    <span className="course-category-tag">
                      {course.category}
                    </span>
                  </div>

                  <div className="learning-card-body">
                    <h2>{course.title}</h2>

                    <p>{course.description}</p>

                    <div className="course-meta">
                      <span>
                        <GraduationCap size={14} />
                        {course.level}
                      </span>

                      <span>
                        <Clock3 size={14} />
                        {course.duration}
                      </span>

                      <span>
                        <BookOpen size={14} />
                        {course.lessons} lessons
                      </span>
                    </div>

                    <div className="course-topics">
                      {course.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>

                    <button
                      className="course-explore"
                      onClick={() =>
                        window.alert(
                          `${course.title} course details will be available when the course content is connected.`
                        )
                      }
                    >
                      Explore course
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="courses-empty">
              No courses found. Try another search or category.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

