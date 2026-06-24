import { Link } from 'react-router-dom'
import { useState } from 'react'
import {postService} from '../../../Services/postServices'
import { useAuth } from '../../../Context/AuthContext'



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

export default function postCard({ post }) {
  const {user} = useAuth()
  const [likes, setLikes] = useState(post.likes?.length  || 0)
  const [liked, setLiked]           = useState(post.likes?.includes(user?._id))
  const [comments, setComments] = useState(post.comments || [])
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText]   = useState('')
  const [commenting, setCommenting]     = useState(false)
  const handleLike = async () => {
    try {
      const data = await postService.likePost(post._id)
      setLikes(data.likes)
      setLiked(data.liked)
    } catch {}
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setCommenting(true)
    try {
      const data = await postService.addComment(post._id, commentText)
      setComments(prev => [...prev, data.comment])
      setCommentText('')
    } catch {}
    finally { setCommenting(false) }
  }
  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return
    try {
      await postService.deletePost(post._id)
      onDelete?.(post._id)
    } catch {}
  }
  const initials = post.user?.name?.slice(0, 2).toUpperCase() || 'U'
  const timeAgo  = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000)
    if (diff < 60)   return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
  return (
    <div className="fk-card p-4 mb-3">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-3">
        {/* Avatar */}
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: 'var(--fk-primary-btn)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '0.875rem', flexShrink: 0, overflow: 'hidden',
        }}>
          {post.user?.avatar
            ? <img src={`http://localhost:5000${post.user.avatar}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : initials}
        </div>

        {/* Name + time */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--fk-text-primary)' }}>
            {post.user?.name}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)' }}>
            {timeAgo(post.createdAt)}
          </div>
        </div>

        {/* Delete (only own posts) */}
        {user?._id === post.user?._id && (
          <button onClick={handleDelete} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--fk-text-muted)', padding: 4,
          }}>
            
          </button>
        )}
      </div>

      {/* Post text */}
      <p style={{ fontSize: '0.95rem', color: 'var(--fk-text-primary)', lineHeight: 1.7, marginBottom: '1rem' }}>
        {post.text}
      </p>

      {/* Action buttons */}
      <div className="d-flex gap-4" style={{ borderTop: '1px solid var(--fk-border)', paddingTop: '0.75rem' }}>
        {/* Like */}
        <button onClick={handleLike} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5,
          color: liked ? '#e11d48' : 'var(--fk-text-muted)',
          fontWeight: 600, fontSize: '0.85rem',
        }}>
          
          {likes}
        </button>

        {/* Comment */}
        <button onClick={() => setShowComments(p => !p)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5,
          color: 'var(--fk-text-muted)', fontWeight: 600, fontSize: '0.85rem',
        }}>
         
          {comments.length}
        </button>

     

      {/* Comments section */}
      {showComments && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--fk-border)', paddingTop: '1rem' }}>
          {/* Existing comments */}
          {comments.map((c, i) => (
            <div key={i} className="d-flex gap-2 mb-2">
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'var(--fk-primary-btn)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.72rem', flexShrink: 0,
              }}>
                {c.author?.name?.slice(0, 2).toUpperCase() || 'U'}
              </div>
              <div style={{
                background: 'var(--fk-bg)', borderRadius: 'var(--radius-sm)',
                padding: '6px 12px', fontSize: '0.85rem', flex: 1,
              }}>
                <span style={{ fontWeight: 700, marginRight: 6 }}>{c.author?.name}</span>
                {c.text}
              </div>
            </div>
          ))}

          {/* Add comment */}
          <form onSubmit={handleComment} className="d-flex gap-2 mt-2">
            <input
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              style={{
                flex: 1, borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--fk-border)',
                padding: '6px 14px', fontSize: '0.85rem',
                background: 'var(--fk-bg)', color: 'var(--fk-text-primary)',
                outline: 'none',
              }}
            />
            <button type="submit" disabled={commenting} style={{
              padding: '6px 16px', borderRadius: 'var(--radius-pill)',
              background: 'var(--fk-primary-btn)', color: '#fff',
              border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
            }}>
              {commenting ? '...' : 'Post'}
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
  )
}
