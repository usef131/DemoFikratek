import { Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap'

const CATEGORY_COLORS = {
  Tech:        { bg: '#EEF0FF', color: '#3E54AC' },
  Health:      { bg: '#D1FAE5', color: '#065F46' },
  Education:   { bg: '#FEF3C7', color: '#92400E' },
  Finance:     { bg: '#E0F2FE', color: '#0369A1' },
  Environment: { bg: '#ECFDF5', color: '#047857' },
  Social:      { bg: '#FDF2F8', color: '#9D174D' },
  Other:       { bg: '#F3F4F6', color: '#374151' },
}

export default function IdeaCard({ idea }) {
  const catStyle = CATEGORY_COLORS[idea.category] || CATEGORY_COLORS.Other

  return (
    <div className="fk-card h-100 p-4 d-flex flex-column">
      {/* Header */}
      <div className="d-flex align-items-start justify-content-between mb-3">
        <span
          className="fk-badge"
          style={{ background: catStyle.bg, color: catStyle.color }}
        >
          {idea.category}
        </span>
        {idea.status === 'approved' && (
          <span className="fk-badge fk-badge-success">
            <i className="bi bi-patch-check-fill" /> Approved
          </span>
        )}
      </div>

      {/* Title */}
      <h5
        className="mb-2"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          lineHeight: 1.4,
          flexGrow: 0,
        }}
      >
        {idea.title}
      </h5>

      {/* Summary */}
      <p
        className="mb-3"
        style={{
          fontSize: '0.875rem',
          color: 'var(--fk-text-secondary)',
          flexGrow: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {idea.summary}
      </p>

      {/* Footer */}
      <div className="d-flex align-items-center justify-content-between mt-auto pt-3"
        style={{ borderTop: '1px solid var(--fk-border)' }}>
        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              width: 32, height: 32,
              borderRadius: '50%',
              background: 'var(--fk-primary)',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            {idea.entrepreneur?.name?.[0] || '?'}
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--fk-text-primary)' }}>
              {idea.entrepreneur?.name || 'Anonymous'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--fk-text-muted)' }}>
              {new Date(idea.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3" style={{ fontSize: '0.8rem', color: 'var(--fk-text-secondary)' }}>
          <span><i className="bi bi-eye me-1" />{idea.views || 0}</span>
          <span><i className="bi bi-heart me-1" />{idea.interestCount || 0}</span>
          <Link
            to={`/ideas/${idea._id}`}
            className="btn btn-sm btn-outline-primary"
            style={{ borderRadius: 'var(--radius-pill)', fontSize: '0.78rem' }}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
