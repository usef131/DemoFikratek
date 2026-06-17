import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { ideaService } from '../../../Services/ideaService'
import { useIdeas } from '../../../Context/IdeaContext'

const CATEGORIES = ['Tech', 'Health', 'Education', 'Finance', 'Environment', 'Social', 'Other']

export default function CreateIdea() {
  const navigate = useNavigate()
  const { addIdea } = useIdeas()

  const [form, setForm] = useState({
    title: '',
    summary: '',
    description: '',
    category: '',
    targetMarket: '',
    fundingGoal: '',
  })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.title.trim())    e.title    = 'Title is required'
    if (form.title.length > 100) e.title  = 'Title must be under 100 characters'
    if (!form.summary.trim())  e.summary  = 'Summary is required'
    if (form.summary.length > 300) e.summary = 'Summary must be under 300 characters'
    if (!form.category)        e.category = 'Please select a category'
    if (form.fundingGoal && isNaN(Number(form.fundingGoal))) e.fundingGoal = 'Enter a valid number'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return }

    setLoading(true)
    setApiError('')
    try {
      const data = await ideaService.createIdea({
        ...form,
        fundingGoal: form.fundingGoal ? Number(form.fundingGoal) : undefined,
      })
      addIdea(data.idea)
      navigate(`/ideas/${data.idea._id}`)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const charCount = (field, max) => (
    <small className={form[field].length > max ? 'text-danger' : 'text-muted'}>
      {form[field].length}/{max}
    </small>
  )

  return (
    <section className="section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="mb-5">
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Submit Your Idea</h1>
              <p style={{ color: 'var(--fk-text-secondary)' }}>
                Fill in the details below. Our team will review and approve it before it goes public.
              </p>
            </div>

            {apiError && <Alert variant="danger" onClose={() => setApiError('')} dismissible>{apiError}</Alert>}

            <div className="fk-card p-4 p-md-5">
              <Form onSubmit={handleSubmit} noValidate>
                {/* Title */}
                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between">
                    <Form.Label style={{ fontWeight: 600 }}>Idea Title <span className="text-danger">*</span></Form.Label>
                    {charCount('title', 100)}
                  </div>
                  <Form.Control
                    value={form.title}
                    onChange={handleChange('title')}
                    placeholder="e.g. AI-Powered Agricultural Water Management"
                    isInvalid={!!errors.title}
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                {/* Category */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600 }}>Category <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    value={form.category}
                    onChange={handleChange('category')}
                    isInvalid={!!errors.category}
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                </Form.Group>

                {/* Summary */}
                <Form.Group className="mb-4">
                  <div className="d-flex justify-content-between">
                    <Form.Label style={{ fontWeight: 600 }}>Short Summary <span className="text-danger">*</span></Form.Label>
                    {charCount('summary', 300)}
                  </div>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.summary}
                    onChange={handleChange('summary')}
                    placeholder="A brief overview of your idea and the problem it solves"
                    isInvalid={!!errors.summary}
                    style={{ borderRadius: 'var(--radius-sm)', resize: 'vertical' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.summary}</Form.Control.Feedback>
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600 }}>Full Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={form.description}
                    onChange={handleChange('description')}
                    placeholder="Describe your idea in detail: the problem, your solution, how it works, business model…"
                    style={{ borderRadius: 'var(--radius-sm)', resize: 'vertical' }}
                  />
                </Form.Group>

                {/* Target Market */}
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600 }}>Target Market</Form.Label>
                  <Form.Control
                    value={form.targetMarket}
                    onChange={handleChange('targetMarket')}
                    placeholder="Who are your potential customers or users?"
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  />
                </Form.Group>

                {/* Funding Goal */}
                <Form.Group className="mb-5">
                  <Form.Label style={{ fontWeight: 600 }}>Funding Goal (USD)</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.fundingGoal}
                    onChange={handleChange('fundingGoal')}
                    placeholder="e.g. 50000"
                    isInvalid={!!errors.fundingGoal}
                    min={0}
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  />
                  <Form.Text className="text-muted">Leave blank if not yet determined</Form.Text>
                  <Form.Control.Feedback type="invalid">{errors.fundingGoal}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    style={{
                      background: 'var(--fk-primary)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      padding: '0.75rem 2rem',
                    }}
                  >
                    {loading ? <><Spinner size="sm" className="me-2" />Submitting…</> : 'Submit Idea'}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    onClick={() => navigate(-1)}
                    style={{ borderRadius: 'var(--radius-pill)' }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
