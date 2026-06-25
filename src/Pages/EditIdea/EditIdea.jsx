import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { ideaService } from '../../../Services/ideaService'
import { useIdeas } from '../../../Context/IdeaContext'

const CATEGORIES = ['Tech', 'Health', 'Education', 'Finance', 'Environment', 'Social', 'Other']

export default function EditIdea() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { fetchMyIdeas } = useIdeas()

  const [roadmap, setRoadmap] = useState([{ period: '', title: '', desc: '' }])
  const [form, setForm] = useState({
    title: '', summary: '', description: '',
    category: '', targetMarket: '', fundingGoal: '', teamMembers: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [apiError, setApiError] = useState('')

  // Load existing idea
  useEffect(() => {
    const load = async () => {
      try {
        const data = await ideaService.getIdeaById(id)
        const idea = data.idea || data
        setForm({
          title:        idea.title        || '',
          summary:      idea.summary      || '',
          description:  idea.description  || '',
          category:     idea.category     || '',
          targetMarket: idea.targetMarket || '',
          fundingGoal:  idea.fundingGoal  || '',
          teamMembers:  idea.teamSize     || idea.teamMembers || '',
        })
        if (idea.roadmap?.length) setRoadmap(idea.roadmap)
        if (idea.image) setPreview(idea.image)
      } catch {
        setApiError('Failed to load idea')
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [id])

  const validate = () => {
    const e = {}
    if (!form.title.trim())       e.title      = 'Title is required'
    if (form.title.length > 100)  e.title      = 'Title must be under 100 characters'
    if (!form.summary.trim())     e.summary    = 'Summary is required'
    if (form.summary.length > 300) e.summary   = 'Max 300 characters'
    if (!form.category)           e.category   = 'Please select a category'
    if (form.fundingGoal && isNaN(Number(form.fundingGoal))) e.fundingGoal = 'Enter a valid number'
    if (!form.teamMembers)        e.teamMembers = 'Team members is required'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('roadmap state:', roadmap)
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true); setApiError('')
    try {
      await ideaService.updateIdea(id, {
        ...form,
        ...(imageFile ? { image: imageFile } : {}),
        roadmap,
        fundingGoal: form.fundingGoal ? Number(form.fundingGoal) : undefined,
      })
      await fetchMyIdeas()
      navigate(`/browse-projects/${id}`, { replace: true, state: { refresh: true } })
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const charCount = (field, max) => (
    <small style={{ color: form[field].length > max ? 'var(--fk-danger)' : 'var(--fk-text-muted)', fontSize: '0.78rem' }}>
      {form[field].length}/{max}
    </small>
  )

  const addRoadmapItem = () => setRoadmap(prev => [...prev, { period: '', title: '', desc: '' }])
  const removeRoadmapItem = (i) => setRoadmap(prev => prev.filter((_, idx) => idx !== i))
  const handleRoadmapChange = (i, field, value) =>
    setRoadmap(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item))

  if (fetching) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)' }} />
    </div>
  )

  return (
    <div style={{ background: 'var(--fk-bg)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--fk-surface)', borderBottom: '1px solid var(--fk-border)', padding: '1.75rem 0 1rem' }}>
        <Container>
          <h1 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.2rem' }} className='text-center'>Edit Your Idea</h1>
          <p style={{ color: 'var(--fk-text-secondary)', fontSize: '0.875rem', margin: 0 }} className='text-center'>
            Update the details below and save your changes.
          </p>
        </Container>
      </div>

      <Container style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <Row className="justify-content-center">
          <Col lg={8}>
            {apiError && (
              <Alert variant="danger" dismissible onClose={() => setApiError('')}
                style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                {apiError}
              </Alert>
            )}

            <div className="fk-card p-4">
              <Form onSubmit={handleSubmit} noValidate>

                {/* Title */}
                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                      Idea Title <span className="text-danger">*</span>
                    </Form.Label>
                    {charCount('title', 100)}
                  </div>
                  <Form.Control
                    value={form.title}
                    onChange={handleChange('title')}
                    placeholder="e.g. AI-Powered Agricultural Water Management"
                    isInvalid={!!errors.title}
                    style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                {/* Category */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    value={form.category}
                    onChange={handleChange('category')}
                    isInvalid={!!errors.category}
                    style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                </Form.Group>

                {/* Summary */}
                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                      Short Summary <span className="text-danger">*</span>
                    </Form.Label>
                    {charCount('summary', 300)}
                  </div>
                  <Form.Control
                    as="textarea" rows={3}
                    value={form.summary}
                    onChange={handleChange('summary')}
                    placeholder="A brief overview of your idea and the problem it solves"
                    isInvalid={!!errors.summary}
                    style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.summary}</Form.Control.Feedback>
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Full Description</Form.Label>
                  <Form.Control
                    as="textarea" rows={6}
                    value={form.description}
                    onChange={handleChange('description')}
                    placeholder="Describe your idea in detail…"
                    style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                </Form.Group>

                {/* Target Market */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Target Market</Form.Label>
                  <Form.Control
                    value={form.targetMarket}
                    onChange={handleChange('targetMarket')}
                    placeholder="Who are your potential customers or users?"
                    style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                  />
                </Form.Group>

                {/* Team Members */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Team Members</Form.Label>
                  <Form.Control
                    type="number" min={1}
                    value={form.teamMembers}
                    onChange={handleChange('teamMembers')}
                    placeholder="e.g. 3"
                    isInvalid={!!errors.teamMembers}
                    style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.teamMembers}</Form.Control.Feedback>
                </Form.Group>

                {/* Funding Goal */}
                <Form.Group className="mb-5">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Funding Goal (USD)</Form.Label>
                  <Form.Control
                    type="number" min={0}
                    value={form.fundingGoal}
                    onChange={handleChange('fundingGoal')}
                    placeholder="e.g. 50000"
                    isInvalid={!!errors.fundingGoal}
                    style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                  />
                  <Form.Text style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)' }}>
                    Leave blank if not yet determined
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">{errors.fundingGoal}</Form.Control.Feedback>
                </Form.Group>

                {/* Roadmap */}
                <Form.Group className="mb-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>Project Roadmap</Form.Label>
                    <button type="button" onClick={addRoadmapItem}
                      style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer' }}>
                      + Add Phase
                    </button>
                  </div>
                  {roadmap.map((item, i) => (
                    <div key={i} style={{ borderLeft: '3px solid #3151b5', padding: '16px', marginBottom: '12px', background: '#f8f9fc', borderRadius: '0 8px 8px 0' }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#3151b5' }}>Phase {i + 1}</span>
                        {roadmap.length > 1 && (
                          <button type="button" onClick={() => removeRoadmapItem(i)}
                            style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.8rem' }}>
                            ✕ Remove
                          </button>
                        )}
                      </div>
                      <div className="row g-2">
                        <div className="col-4">
                          <Form.Control
                            placeholder="Period (e.g. Q1 2025)"
                            value={item.period}
                            onChange={(e) => handleRoadmapChange(i, 'period', e.target.value)}
                            style={{ fontSize: '0.875rem' }}
                          />
                        </div>
                        <div className="col-8">
                          <Form.Control
                            placeholder="Phase title (e.g. MVP Launch)"
                            value={item.title}
                            onChange={(e) => handleRoadmapChange(i, 'title', e.target.value)}
                            style={{ fontSize: '0.875rem' }}
                          />
                        </div>
                        <div className="col-12">
                          <Form.Control
                            as="textarea" rows={2}
                            placeholder="Description of this phase..."
                            value={item.desc}
                            onChange={(e) => handleRoadmapChange(i, 'desc', e.target.value)}
                            style={{ fontSize: '0.875rem', resize: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Form.Group>

                {/* Image */}
                <Form.Group className="mb-5">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Idea Image</Form.Label>
                  <Form.Control
                    type="file" accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (!file) return
                      setPreview(URL.createObjectURL(file))
                      const reader = new FileReader()
                      reader.onloadend = () => setImageFile(reader.result)
                      reader.readAsDataURL(file)
                    }}
                    style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                  />
                  {preview && (
                    <img src={preview} alt="preview"
                      style={{ marginTop: '0.75rem', width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                  )}
                </Form.Group>

                <div className="d-flex gap-3">
                  <Button type="submit" size="lg" disabled={loading} className="btn-primary"
                    style={{ borderRadius: 'var(--radius-pill)', fontWeight: 700, padding: '0.7rem 2rem' }}>
                    {loading ? <><Spinner size="sm" className="me-2" />Saving…</> : 'Save Changes'}
                  </Button>
                  <Button variant="outline-secondary" size="lg" onClick={() => navigate(-1)} disabled={loading}
                    style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
                    Cancel
                  </Button>
                </div>

              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
