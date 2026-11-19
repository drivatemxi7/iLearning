
import React, { useState } from 'react';
import { Search, FileText, Sparkles } from 'lucide-react';

const resources = [
  {
    title: 'Spreadsheet essentials',
    category: 'Spreadsheet',
    type: 'PDF',
  },
  {
    title: 'Introduction to 3D modelling',
    category: '3D',
    type: 'PDF',
  },
  {
    title: 'Design principles handbook',
    category: 'Design',
    type: 'PDF',
  },
];

export default function Library() {
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');

  const filteredResources = resources.filter((resource) =>
    `${resource.title} ${resource.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="library-page">
      <style>{`
        .library-page {
          width: 100%;
          max-width: 100%;
          min-height: 100vh;
          box-sizing: border-box;
          padding: 48px 24px 64px;
          background: #eeeee9;
          color: #101b49;
          overflow-x: hidden;
        }

        .library-content {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
        }

        .library-content h1 {
          margin: 0 0 12px;
          font-size: clamp(30px, 5vw, 44px);
          line-height: 1.12;
          letter-spacing: -1.8px;
        }

        .library-intro {
          max-width: 540px;
          margin: 0 0 24px;
          color: #788092;
          font-size: 14px;
          line-height: 1.7;
        }

        .library-search {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-height: 48px;
          box-sizing: border-box;
          padding: 0 14px;
          border: 1px solid #dedede;
          border-radius: 9px;
          background: white;
          color: #858b99;
        }

        .library-search input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #101b49;
          font: inherit;
          font-size: 13px;
        }

        .library-search input::placeholder {
          color: #89909e;
        }

        .library-update {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 14px 0 28px;
          color: #858b99;
          font-size: 11px;
        }

        .library-update svg {
          color: #b28a48;
        }

        .library-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .library-resource {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding: 14px;
          border: 1px solid #e2e2df;
          border-radius: 10px;
          background: #fff;
        }

        .library-file-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 40px;
          width: 40px;
          height: 42px;
          border-radius: 8px;
          background: #f0edf3;
          color: #33243d;
        }

        .library-resource-info {
          flex: 1;
          min-width: 0;
        }

        .library-resource-info strong {
          display: block;
          overflow-wrap: anywhere;
          color: #101b49;
          font-size: 12px;
          font-weight: 600;
        }

        .library-resource-info small {
          display: block;
          margin-top: 5px;
          color: #89909e;
          font-size: 11px;
        }

        .library-open {
          flex: 0 0 auto;
          max-width: 105px;
          padding: 9px 12px;
          border: 1px solid #e4e4e4;
          border-radius: 7px;
          background: #f8f8f7;
          color: #26334e;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
        }

        .library-open:hover {
          background: #eeedf2;
        }

        .library-empty {
          padding: 28px 12px;
          text-align: center;
          color: #858b99;
          font-size: 13px;
        }

        .library-notice {
          position: fixed;
          z-index: 20;
          right: 20px;
          bottom: 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          width: min(280px, calc(100vw - 40px));
          box-sizing: border-box;
          padding: 16px;
          border-radius: 10px;
          background: #222238;
          color: white;
          box-shadow: 0 8px 24px rgba(0,0,0,.18);
          font-size: 12px;
          line-height: 1.45;
        }

        .library-notice button {
          flex: 0 0 auto;
          border: 0;
          background: transparent;
          color: white;
          font-size: 19px;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .library-page {
            padding: 36px 18px 48px;
          }

          .library-resource {
            gap: 9px;
            padding: 11px;
          }

          .library-open {
            max-width: 88px;
            padding: 9px 8px;
            font-size: 11px;
          }
        }
      `}</style>

      <div className="library-content">
        <h1>Resources worth keeping close.</h1>

        <p className="library-intro">
          Browse helpful documents and learning materials selected to support
          your skills journey.
        </p>

        <div className="library-search">
          <Search size={19} />

          <input
            type="search"
            placeholder="Search the library..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search the library"
          />
        </div>

        <div className="library-update">
          <Sparkles size={14} />
          <span>New resources added regularly</span>
        </div>

        <div className="library-list">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <article className="library-resource" key={resource.title}>
                <div className="library-file-icon">
                  <FileText size={21} />
                </div>

                <div className="library-resource-info">
                  <strong>{resource.title}</strong>
                  <small>
                    {resource.category} · {resource.type}
                  </small>
                </div>

                <button
                  className="library-open"
                  onClick={() =>
                    setNotice(
                      'This sample resource will be connected when the library backend is added.'
                    )
                  }
                >
                  Open resource
                </button>
              </article>
            ))
          ) : (
            <div className="library-empty">
              No resources found matching "{search}".
            </div>
          )}
        </div>
      </div>

      {notice && (
        <div className="library-notice" role="status">
          <span>{notice}</span>

          <button
            onClick={() => setNotice('')}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
