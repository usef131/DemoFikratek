import { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Button, Badge, Spinner, Alert, Form } from 'react-bootstrap'
import { ideaService } from '../../../Services/ideaService'

export default function AdminPanel() {
  const [ideas,   setIdeas]   = useState([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('pending')
  const [action,  setAction]  = useState({})  // { [id]: 'loading'|'done' }

  useEffect(() => {
    setLoading(true)
    ideaService.getAllIdeas({ status: filter })
      .then(d => setIdeas(d.ideas || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [filter])

  const handleApprove = async (id) => {
    setAction(a => ({ ...a, [id]: 'loading' }))
    try {
      await ideaService.approveIdea(id)
      setIdeas(prev => prev.filter(i => i._id !== id))
    } catch { /* ignore */ }
    setAction(a => ({ ...a, [id]: 'done' }))
  }

  const handleReject = async (id) => {
    const reason = window.prompt('Reason for rejection (optional):')
    setAction(a => ({ ...a, [id]: 'loading' }))
    try {
      await ideaService.rejectIdea(id, reason)
      setIdeas(prev => prev.filter(i => i._id !== id))
    } catch { /* ignore */ }
    setAction(a => ({ ...a, [id]: 'done' }))
  }

  const STATUS_BADGE = {
    pending:  { bg: '#FEF3C7', color: '#92400E', label: 'Pending' },
    approved: { bg: '#D1FAE5', color: '#065F46', label: 'Approved' },
    rejected: { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' },
  }

  return (
    <section className="section">
      <Container fluid className="px-4">
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '0.25rem' }}>
          Admin Panel
        </h1>
        <p style={{ color: 'var(--fk-text-secondary)', marginBottom: '2rem' }}>
          Review and manage submitted ideas
        </p>

        {/* Filter Tabs */}
        <div className="d-flex gap-2 mb-4">
          {['pending', 'approved', 'rejected'].map(s => (
            <Button
              key={s}
              variant={filter === s ? 'primary' : 'outline-secondary'}
              size="sm"
              onClick={() => setFilter(s)}
              style={{ borderRadius: 'var(--radius-pill)', textTransform: 'capitalize', fontWeight: 600 }}
            >
              {s}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: 'var(--fk-primary)' }} />
          </div>
        ) : ideas.length > 0 ? (
          <div className="fk-card" style={{ overflowX: 'auto' }}>
            <Table hover className="mb-0" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
              <thead style={{ background: 'var(--fk-bg)', borderBottom: '2px solid var(--fk-border)' }}>
                <tr>
                  <th style={{ padding: '1rem', fontWeight: 700 }}>Idea</th>
                  <th style={{ padding: '1rem', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '1rem', fontWeight: 700 }}>Entrepreneur</th>
                  <th style={{ padding: '1rem', fontWeight: 700 }}>Submitted</th>
                  <th style={{ padding: '1rem', fontWeight: 700 }}>Status</th>
                  {filter === 'pending' && <th style={{ padding: '1rem', fontWeight: 700 }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {ideas.map(idea => {
                  const badge = STATUS_BADGE[idea.status] || STATUS_BADGE.pending
                  return (
                    <tr key={idea._id}>
                      <td style={{ padding: '1rem', maxWidth: 280 }}>
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{idea.title}</div>
                        <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {idea.summary}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className="fk-badge fk-badge-primary">{idea.category}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>{idea.entrepreneur?.name || '—'}</td>
                      <td style={{ padding: '1rem', whiteSpace: 'nowrap', color: 'var(--fk-text-secondary)' }}>
                        {new Date(idea.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className="fk-badge" style={{ background: badge.bg, color: badge.color }}>
                          {badge.label}
                        </span>
                      </td>
                      {filter === 'pending' && (
                        <td style={{ padding: '1rem' }}>
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant="success"
                              disabled={action[idea._id] === 'loading'}
                              onClick={() => handleApprove(idea._id)}
                              style={{ borderRadius: 'var(--radius-pill)' }}
                            >
                              <i className="bi bi-check-lg me-1" />Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              disabled={action[idea._id] === 'loading'}
                              onClick={() => handleReject(idea._id)}
                              style={{ borderRadius: 'var(--radius-pill)' }}
                            >
                              <i className="bi bi-x-lg me-1" />Reject
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-inbox" style={{ fontSize: '3rem', color: 'var(--fk-border)' }} />
            <p className="mt-3" style={{ color: 'var(--fk-text-muted)' }}>
              No {filter} ideas found.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
