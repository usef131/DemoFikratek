import { Link } from 'react-router-dom'

const STATUS_STYLES = {
  prototype: 'fk-status-prototype',
  idea:      'fk-status-idea',
  launched:  'fk-status-launched',
  approved:  'fk-status-launched',
  pending:   'fk-status-idea',
  rejected:  '',
}

const CATEGORY_COLORS = {
  Tech:        { bg: '#eef0ff', color: '#3e54ac' },
  Health:      { bg: '#d1fae5', color: '#065f46' },
  Education:   { bg: '#fef3c7', color: '#92400e' },
  Finance:     { bg: '#e0f2fe', color: '#0369a1' },
  Environment: { bg: '#ecfdf5', color: '#047857' },
  Social:      { bg: '#fdf2f8', color: '#9d174d' },
  Other:       { bg: '#f3f4f6', color: '#374151' },
}

export default function IdeaCard({ idea }) {
  const catStyle = CATEGORY_COLORS[idea.category] || CATEGORY_COLORS.Other
  const statusKey = (idea.status || 'idea').toLowerCase()
  const statusClass = STATUS_STYLES[statusKey] || 'fk-status-idea'
  const fundingPct = idea.fundingGoal && idea.fundingRaised
    ? Math.min(100, Math.round((idea.fundingRaised / idea.fundingGoal) * 100))
    : idea.fundingProgress || 0

  return (
    <div className="fk-card h-100 p-4 d-flex flex-column">
      {/* Top row: category + status badge */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '3px 10px',
          borderRadius: 'var(--radius-pill)',
          fontSize: '0.72rem',
          fontWeight: 600,
          background: catStyle.bg,
          color: catStyle.color,
        }}>
          {idea.category}
        </span>
        {idea.status && (
          <span className={`fk-status-badge ${statusClass}`} style={{ textTransform: 'capitalize' }}>
            {idea.status === 'approved' ? 'Launched' : idea.status}
          </span>
        )}
      </div>

      {/* Title */}
      <h5 style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.5rem' }}>
        {idea.title}
      </h5>

      {/* Category label */}
      <p style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>
        {idea.industry || idea.category}
      </p>

      {/* Summary */}
      <p style={{
        fontSize: '0.845rem',
        color: 'var(--fk-text-secondary)',
        lineHeight: 1.6,
        flexGrow: 1,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        marginBottom: '1rem',
      }}>
        {idea.summary}
      </p>

      {/* Funding + Team row */}
      <div className="d-flex align-items-center gap-4 mb-3" style={{ fontSize: '0.78rem', color: 'var(--fk-text-secondary)' }}>
        <span>
          <i className="bi bi-currency-dollar me-1" style={{ color: 'var(--fk-text-muted)' }} />
          <span style={{ fontWeight: 500, color: 'var(--fk-text-primary)', fontSize: '0.8rem' }}>
            {idea.fundingGoal ? `$${Number(idea.fundingGoal).toLocaleString()}` : '—'}
          </span>
          <span style={{ color: 'var(--fk-text-muted)', marginLeft: 2 }}>Funding</span>
        </span>
        <span>
          <i className="bi bi-people me-1" style={{ color: 'var(--fk-text-muted)' }} />
          <span style={{ fontWeight: 500, color: 'var(--fk-text-primary)', fontSize: '0.8rem' }}>
            {idea.teamSize || idea.entrepreneur?.teamSize || '1'}
          </span>
          <span style={{ color: 'var(--fk-text-muted)', marginLeft: 2 }}>
            {(idea.teamSize || 1) === 1 ? 'member' : 'members'}
          </span>
        </span>
      </div>

      {/* Funding Progress Bar */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span style={{ fontSize: '0.72rem', color: 'var(--fk-text-muted)' }}>Funding Progress</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--fk-primary-btn)' }}>{fundingPct}%</span>
        </div>
        <div className="fk-progress">
          <div className="fk-progress-fill" style={{ width: `${fundingPct}%` }} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="d-flex gap-2 mt-auto">
        <Link
          to={`/ideas/${idea._id}`}
          className="btn btn-primary btn-sm flex-grow-1"
          style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600, fontSize: '0.82rem' }}
        >
          <i className="bi bi-eye me-1" />View Project
        </Link>
        <button
          className="btn btn-outline-primary btn-sm"
          style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600, fontSize: '0.82rem', minWidth: 70 }}
          onClick={e => { e.preventDefault(); /* invest handler */ }}
        >
          Invest
        </button>
      </div>
    </div>
  )
}
