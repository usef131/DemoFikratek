import { useState } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import api from '../../../Services/api'

const AMOUNTS = [1000, 5000, 10000, 25000, 50000]

export default function InvestModal({ show, onHide, idea }) {
  const [form, setForm] = useState({
    fullName: '', company: '', linkedin: '',
    experience: '1-3 years', amount: 10000, customAmount: '', message: ''
  })
  const [useCustom, setUseCustom] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [success, setSuccess]     = useState(false)
  const [error, setError]         = useState('')

  const handleChange = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.fullName) return setError('Full name is required')
    const amount = useCustom ? Number(form.customAmount) : form.amount
    if (!amount || amount <= 0) return setError('Enter a valid amount')
    setLoading(true); setError('')
    try {
      await api.post(`/ideas/${idea._id}/investments`, { ...form, amount })
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => { onHide(); setSuccess(false); setError('') }

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header style={{ background: '#1a3a6b', border: 'none' }}>
        <Modal.Title style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>
          Investment interest
        </Modal.Title>
        
      </Modal.Header>

      <Modal.Body>
        {success ? (
          <div className="text-center py-4">
            
            <h5 className="mt-3">Interest submitted!</h5>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>
              The founder has been notified and will reach out if there's a match.
            </p>
          </div>
        ) : (
          <>
            {/* Idea pill */}
            <div style={{ background: '#f8f9fc', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: '0.875rem' }}>
              <strong>{idea?.title}</strong>
              <span className="text-muted ms-2">· Goal: ${Number(idea?.fundingGoal || 0).toLocaleString()}</span>
            </div>

            {error && <div className="alert alert-danger py-2" style={{ fontSize: '0.875rem' }}>{error}</div>}

            {/* About you */}
            <p style={{ fontWeight: 600, fontSize: '0.75rem', color: '#667085', textTransform: 'uppercase', letterSpacing: '0.06em' }}>About you</p>
            <div className="row g-2 mb-2">
              <div className="col-6">
                <Form.Control placeholder="Full name *" value={form.fullName} onChange={handleChange('fullName')} style={{ fontSize: '0.875rem' }} />
              </div>
              <div className="col-6">
                <Form.Control placeholder="Company / firm" value={form.company} onChange={handleChange('company')} style={{ fontSize: '0.875rem' }} />
              </div>
              <div className="col-6">
                <Form.Control placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange('linkedin')} style={{ fontSize: '0.875rem' }} />
              </div>
              <div className="col-6">
                <Form.Select value={form.experience} onChange={handleChange('experience')} style={{ fontSize: '0.875rem' }}>
                  <option>Less than 1 year</option>
                  <option>1-3 years</option>
                  <option>3-7 years</option>
                  <option>7+ years</option>
                </Form.Select>
              </div>
            </div>

            <hr />

            {/* Amount */}
            <p style={{ fontWeight: 600, fontSize: '0.75rem', color: '#667085', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Intended amount (USD)</p>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {AMOUNTS.map(a => (
                <button key={a}
                  onClick={() => { setForm(p => ({ ...p, amount: a })); setUseCustom(false) }}
                  style={{
                    padding: '6px 14px', borderRadius: 8, fontSize: '0.875rem', cursor: 'pointer',
                    border: !useCustom && form.amount === a ? '1.5px solid #1a3a6b' : '1px solid #dee2e6',
                    background: !useCustom && form.amount === a ? '#eef2ff' : 'transparent',
                    color: !useCustom && form.amount === a ? '#1a3a6b' : '#667085',
                    fontWeight: !useCustom && form.amount === a ? 600 : 400,
                  }}>
                  ${a.toLocaleString()}
                </button>
              ))}
              <button onClick={() => setUseCustom(true)}
                style={{
                  padding: '6px 14px', borderRadius: 8, fontSize: '0.875rem', cursor: 'pointer',
                  border: useCustom ? '1.5px solid #1a3a6b' : '1px solid #dee2e6',
                  background: useCustom ? '#eef2ff' : 'transparent',
                  color: useCustom ? '#1a3a6b' : '#667085',
                }}>
                Custom
              </button>
            </div>
            {useCustom && (
              <Form.Control type="number" placeholder="Enter amount" value={form.customAmount}
                onChange={handleChange('customAmount')} className="mb-2" style={{ fontSize: '0.875rem' }} />
            )}

            {/* Message */}
            <Form.Control as="textarea" rows={3} placeholder="Message to founder — why are you interested?" value={form.message}
              onChange={handleChange('message')} style={{ fontSize: '0.875rem', resize: 'none', marginTop: 8 }} />
          </>
        )}
      </Modal.Body>

      {!success && (
        <Modal.Footer style={{ border: 'none' }}>
          <Button variant="outline-secondary" onClick={handleClose} style={{ borderRadius: 8 }}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}
            style={{ background: '#1a3a6b', border: 'none', borderRadius: 8, fontWeight: 600 }}>
            {loading ? <Spinner size="sm" /> : 'Submit interest'}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}