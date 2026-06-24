import { useState } from 'react'
import { useAuth } from '../../../Context/AuthContext'
import {postService }from '../../../Services/postServices'
import { Spinner } from 'react-bootstrap'

export default function CreatePost({onPostCreated}) {
    const {user} = useAuth()
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const initials = user?.name?.slice(0, 2).toUpperCase() || 'U'
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!text.trim()) return
        setLoading(true)
        setError('')
        try {
            const {post} = await postService.createPost(text)
            if (onPostCreated) {
              onPostCreated(post)
            }
            setText('')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    
  return (
   <div className="fk-card p-4 mb-4">
      <div className="d-flex gap-3">
        {/* Avatar */}
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: 'var(--fk-primary-btn)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '0.875rem', flexShrink: 0,
        }}>
          {initials}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            style={{
              width: '100%', borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--fk-border)',
              padding: '10px 14px', fontSize: '0.9rem', resize: 'vertical',
              background: 'var(--fk-bg)', color: 'var(--fk-text-primary)',
              outline: 'none', marginBottom: '0.75rem',
            }}
          />
          {error && <p style={{ color: 'var(--fk-danger)', fontSize: '0.82rem', marginBottom: 8 }}>{error}</p>}
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ fontSize: '0.78rem', color: text.length > 900 ? 'var(--fk-danger)' : 'var(--fk-text-muted)' }}>
              {text.length}/1000
            </span>
            <button type="submit" disabled={loading || !text.trim()} style={{
              padding: '7px 20px', borderRadius: 'var(--radius-pill)',
              background: 'var(--fk-primary-btn)', color: '#fff',
              border: 'none', fontWeight: 700, fontSize: '0.875rem',
              cursor: text.trim() ? 'pointer' : 'not-allowed',
              opacity: text.trim() ? 1 : 0.6,
            }}>
              {loading ? <Spinner size="sm" /> : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

