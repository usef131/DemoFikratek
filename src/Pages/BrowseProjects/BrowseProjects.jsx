import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Spinner, Dropdown } from 'react-bootstrap'
import { useIdeas } from '../../../Context/IdeaContext'
import IdeaCard from '../../Components/cards/IdeaCard'
import { FaArrowLeft } from "react-icons/fa";
import { FiHome } from 'react-icons/fi'
import SecondNavbar from '../../Components/Common/SecondNavbar'
const CATEGORIES = ['All', 'Tech', 'Health', 'Education', 'Finance', 'Environment', 'Social']

export default function BrowseProjects() {
    const { ideas, loading, pagination, fetchIdeas } = useIdeas()
    const [searchParams, setSearchParams] = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || 'All')
    const [sort, setSort] = useState('newest')
    const [page, setPage] = useState(1)

    const load = useCallback((overrides = {}) => {
        const params = {
            search: search || undefined,
            category: category !== 'All' ? category : undefined,
            sort,
            page,
            limit: 9,
            status: 'approved',
            ...overrides,
        }
        const sp = new URLSearchParams()
        if (params.search) sp.set('search', params.search)
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


        <div style={{ minHeight: '100vh', background: 'var(--fk-bg)' }}>
            
            {/* navbar */}
            <SecondNavbar />

            <Container style={{ paddingTop: '1.75rem', paddingBottom: '3rem' }}>
                {/* Search + Filter bar */}
                <div className="d-flex align-items-center gap-3 flex-wrap mb-4">
                    {/* Search */}
                    <form onSubmit={handleSearch} style={{ flex: '1 1 300px', position: 'relative', maxWidth: 520 }}>
                        <i className="bi bi-search" style={{
                            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                            color: 'var(--fk-text-muted)', fontSize: '0.9rem',
                        }} />
                        <Form.Control
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search projects, categories..."
                            style={{
                                borderRadius: 'var(--radius-pill)',
                                paddingLeft: 38,
                                paddingRight: 12,
                                fontSize: '0.875rem',
                                border: '1.5px solid var(--fk-border)',
                            }}
                        />
                    </form>

                    {/* Stage dropdown */}
        

                    {/* Sort / Filters */}
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="outline-secondary"
                            size="sm"
                            style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600, fontSize: '0.85rem' }}
                        >
                            <i className="bi bi-funnel me-1" />Filters
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                            <Dropdown.Item onClick={() => setSort('newest')}>Newest First</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSort('most_interest')}>Most Interest</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSort('most_viewed')}>Most Viewed</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => { setSearch(''); setCategory('All'); setSort('newest'); setPage(1); fetchIdeas({ status: 'approved', page: 1, limit: 9 }); setSearchParams({}) }}>
                                <i className="bi bi-x-circle me-1 text-danger" />Clear Filters
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    <Link to="/create-idea" className="btn btn-primary ms-auto"
                        style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600, padding: '8px 20px' }}>
                        <i className="bi bi-plus me-1" />Add Your Project
                    </Link>
                </div>

                {/* Category Tabs (pill row) — optional, hidden on mobile can be scrollable */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setCategory(cat); setPage(1) }}
                            className={`fk-cat-pill ${category === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results */}
                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)', width: 36, height: 36 }} />
                        <p className="mt-3" style={{ color: 'var(--fk-text-muted)', fontSize: '0.875rem' }}>Loading projects…</p>
                    </div>
                ) : ideas.length > 0 ? (
                    <>
                        <p style={{ fontSize: '0.8rem', color: 'var(--fk-text-muted)', marginBottom: '1rem' }}>
                            Showing {ideas.length} of {pagination.total} projects
                        </p>
                        <Row className="g-3">
                            {ideas.map(idea => (
                                <Col key={idea._id} md={6} lg={4}>
                                    <IdeaCard idea={idea} />
                                </Col>
                            ))}
                        </Row>

                        {pagination.pages > 1 && (
                            <div className="d-flex justify-content-center gap-2 mt-5">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    disabled={page <= 1}
                                    onClick={() => setPage(p => p - 1)}
                                    style={{ borderRadius: 'var(--radius-pill)', width: 36, height: 36, padding: 0 }}
                                >
                                    <i className="bi bi-chevron-left" />
                                </Button>
                                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                                    <Button
                                        key={p}
                                        size="sm"
                                        variant={p === page ? 'primary' : 'outline-secondary'}
                                        onClick={() => setPage(p)}
                                        style={{ borderRadius: 'var(--radius-pill)', minWidth: 36, height: 36, padding: 0, fontWeight: 600 }}
                                    >
                                        {p}
                                    </Button>
                                ))}
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    disabled={page >= pagination.pages}
                                    onClick={() => setPage(p => p + 1)}
                                    style={{ borderRadius: 'var(--radius-pill)', width: 36, height: 36, padding: 0 }}
                                >
                                    <i className="bi bi-chevron-right" />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-5">
                        <i className="bi bi-search" style={{ fontSize: '2.5rem', color: 'var(--fk-border)' }} />
                        <p className="mt-3 mb-0" style={{ color: 'var(--fk-text-muted)', fontSize: '0.875rem' }}>
                            No projects found. Try adjusting your filters.
                        </p>
                    </div>
                )}
            </Container>
        </div>
    )
}
