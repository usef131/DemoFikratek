import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { useIdeas } from '../../context/IdeaContext'
import IdeaCard from '../../components/cards/IdeaCard'

const CATEGORIES = ['All', 'Tech', 'Health', 'Education', 'Finance', 'Environment', 'Social']

export default function Ideas() {
  const { ideas, loading, pagination, fetchIdeas } = useIdeas()
  const [searchParams, setSearchParams] = useSearchParams()

  const [search,   setSearch]   = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sort,     setSort]     = useState('newest')
  const [page,     setPage]     = useState(1)

  const load = useCallback((overrides = {}) => {
    const params = {
      search:   search || undefined,
      category: category !== 'All' ? category : undefined,
      sort,
      page,
      limit: 9,
      status: 'approved',
      ...overrides,
    }
    // Sync URL
    const sp = new URLSearchParams()
    if (params.search)   sp.set('search', params.search)
    if (params.category) sp.set('category', params.category)
    setSearchParams(sp, { replace: true })
    fetchIdeas(params)
  }, [search, category, sort, page, fetchIdeas, setSearchParams])

  useEffect(() => { load() }, [category, sort, page]) // eslint-disable-line

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    load({ page: 1 })
  }

  return (
    <section className="section">
      <Container>
        {/* Page Header */}
        <div className="mb-5">
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Browse Ideas</h1>
          <p style={{ color: 'var(--fk-text-secondary)' }}>
            Discover innovative projects from young entrepreneurs across Egypt
          </p>
        </div>

        {/* Filters Row */}
        <div
          className="p-4 mb-5 rounded-fk shadow-fk-sm"
          style={{ background: 'var(--fk-surface)', border: '1px solid var(--fk-border)' }}
        >
          <Row className="g-3 align-items-end">
            {/* Search */}
            <Col md={5}>
              <Form onSubmit={handleSearch}>
                <Form.Label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Search</Form.Label>
                <div className="input-group">
                  <Form.Control
                    placeholder="Search by title or keyword…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)' }}
                  />
                  <Button type="submit" variant="primary">
                    <i className="bi bi-search" />
                  </Button>
                </div>
              </Form>
            </Col>

            {/* Sort */}
            <Col md={3}>
              <Form.Label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Sort By</Form.Label>
              <Form.Select
                value={sort}
                onChange={e => { setSort(e.target.value); setPage(1) }}
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most_interest">Most Interest</option>
                <option value="most_viewed">Most Viewed</option>
              </Form.Select>
            </Col>

            {/* Reset */}
            <Col md={2}>
              <Button
                variant="outline-secondary"
                className="w-100"
                style={{ borderRadius: 'var(--radius-sm)' }}
                onClick={() => {
                  setSearch(''); setCategory('All'); setSort('newest'); setPage(1)
                  fetchIdeas({ status: 'approved', page: 1, limit: 9 })
                  setSearchParams({})
                }}
              >
                <i className="bi bi-x-circle me-1" /> Clear
              </Button>
            </Col>
          </Row>

          {/* Category Pills */}
          <div className="d-flex flex-wrap gap-2 mt-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1) }}
                style={{
                  padding: '5px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid',
                  borderColor: category === cat ? 'var(--fk-primary)' : 'var(--fk-border)',
                  background: category === cat ? 'var(--fk-primary)' : 'transparent',
                  color: category === cat ? '#fff' : 'var(--fk-text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: 'var(--fk-primary)' }} />
            <p className="mt-3" style={{ color: 'var(--fk-text-muted)' }}>Loading ideas…</p>
          </div>
        ) : ideas.length > 0 ? (
          <>
            <p style={{ fontSize: '0.875rem', color: 'var(--fk-text-muted)', marginBottom: '1.5rem' }}>
              Showing {ideas.length} of {pagination.total} ideas
            </p>
            <Row className="g-4">
              {ideas.map(idea => (
                <Col key={idea._id} md={6} lg={4}>
                  <IdeaCard idea={idea} />
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="d-flex justify-content-center gap-2 mt-5">
                <Button
                  variant="outline-primary"
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  <i className="bi bi-chevron-left" />
                </Button>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                  <Button
                    key={p}
                    variant={p === page ? 'primary' : 'outline-secondary'}
                    onClick={() => setPage(p)}
                    style={{ borderRadius: 'var(--radius-pill)', minWidth: 40 }}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline-primary"
                  disabled={page >= pagination.pages}
                  onClick={() => setPage(p => p + 1)}
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  <i className="bi bi-chevron-right" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-search" style={{ fontSize: '3rem', color: 'var(--fk-border)' }} />
            <p className="mt-3 mb-0" style={{ color: 'var(--fk-text-muted)' }}>
              No ideas found for your current filters.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
