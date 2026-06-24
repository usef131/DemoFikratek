import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useAuth } from '../../../Context/AuthContext'
import { ideaService } from '../../../Services/ideaService'
import IdeaCard from '../../Components/cards/IdeaCard'
import { useNavigate } from 'react-router-dom'
import { useIdeas } from '../../../Context/IdeaContext'
import SecondNavbar from '../../Components/Common/SecondNavbar'
import CreatePost from '../createPost/createPost'
import PostCard from '../../Components/Cards/postCard'
import { postService } from '../../../Services/postServices'

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { myIdeas, myIdeasLoading, fetchMyIdeas } = useIdeas()
  const [posts, setPosts] = useState([])
  const [interestedIdeas, setInterestedIdeas] = useState([])
  const [interestedLoading, setInterestedLoading] = useState(false)

  useEffect(() => {
    if (user?.role === 'entrepreneur') fetchMyIdeas()
    if (user?.role === 'investor') {
      setInterestedLoading(true)
      ideaService.getInterestedIdeas()
        .then(d => setInterestedIdeas(d.ideas || []))
        .catch(() => {})
        .finally(() => setInterestedLoading(false))
    }
  }, [user?._id])

  useEffect(() => {
    postService.getMyPosts().then(d => setPosts(d.posts || []))
  }, [])

  const handlePostCreated = (newPost) =>
    setPosts(prev => [newPost, ...prev])

  const handlePostDeleted = (postId) =>
    setPosts(prev => prev.filter(p => p._id !== postId))

  const initials =
    user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <>
      <SecondNavbar />

      <div style={{ background: 'var(--fk-bg)', minHeight: '100vh' }}>
        <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

          {/* ── Profile Card ── */}
          <div className="fk-card p-4 mb-4" style={{ position: 'relative' }}>
            <div style={{ height: 80, borderRadius: 'var(--radius-md) var(--radius-md) 0 0', margin: '-1rem -1rem 0' }} />

            <div style={{ marginTop: '-40px', display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <div className="fk-avatar" style={{ width: 80, height: 80, fontSize: '1.5rem', border: '4px solid var(--fk-surface)' }}>
                {initials}
              </div>
              <div style={{ paddingBottom: 4 }}>
                <h1 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.15rem', color: 'var(--fk-text-primary)' }}>
                  {user?.name}
                </h1>
                <span style={{
                  display: 'inline-block', padding: '2px 10px',
                  borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 600,
                  background: user?.role === 'investor' ? '#fef3c7' : '#eef0ff',
                  color: user?.role === 'investor' ? '#92400e' : 'var(--fk-primary-btn)',
                  textTransform: 'capitalize',
                }}>
                  {user?.role}
                </span>
              </div>
              <button onClick={() => navigate('/edit-profile')} style={{
                marginLeft: 'auto', padding: '6px 16px',
                borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--fk-border)',
                background: 'var(--fk-surface)', fontWeight: 600, fontSize: '0.82rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <i className="bi bi-gear" /> Edit Profile
              </button>
            </div>

            {/* Stats row */}
            <div className="d-flex gap-4 mt-4" style={{ fontSize: '0.875rem' }}>
              <div className="text-center">
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>
                  {user?.role === 'investor' ? interestedIdeas.length : posts.length}
                </div>
                <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>
                  {user?.role === 'investor' ? 'Interested' : 'Posts'}
                </div>
              </div>
              <div className="text-center">
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>0</div>
                <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>Followers</div>
              </div>
              <div className="text-center">
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>0</div>
                <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>Likes</div>
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <Tabs defaultActiveKey="ideas" className="mb-3" style={{ fontSize: '0.875rem', fontWeight: 600 }}>

            {/* Entrepreneur: My Ideas */}
            {user?.role === 'entrepreneur' && (
              <Tab eventKey="ideas" title={`My Ideas (${myIdeas.length})`}>
                <div className="mt-3">
                  {myIdeasLoading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)' }} />
                    </div>
                  ) : myIdeas.length > 0 ? (
                    <Row className="g-3">
                      {myIdeas.map(idea => (
                        <Col key={idea._id} xs={12}>
                          <IdeaCard idea={idea} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-lightbulb" style={{ fontSize: '2.5rem', color: 'var(--fk-border)' }} />
                      <p className="mt-3" style={{ color: 'var(--fk-text-muted)', fontSize: '0.875rem' }}>
                        You haven't submitted any ideas yet.{' '}
                        <span style={{ color: 'var(--fk-primary-btn)', cursor: 'pointer', fontWeight: 600 }}
                          onClick={() => navigate('/create-idea')}>
                          Submit one now
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </Tab>
            )}

            {/* Posts tab */}
            <Tab eventKey="posts" title={`Posts (${posts.length})`}>
              <div className="mt-3">
                <CreatePost onPostCreated={handlePostCreated} />
                {posts.map(post => (
                  <PostCard key={post._id} post={post} onDelete={handlePostDeleted} />
                ))}
              </div>
            </Tab>

            {/* Investor: Interested Ideas */}
            {user?.role === 'investor' && (
              <Tab eventKey="interested" title={`Interested Ideas (${interestedIdeas.length})`}>
                <div className="mt-3">
                  {interestedLoading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)' }} />
                    </div>
                  ) : interestedIdeas.length > 0 ? (
                    <Row className="g-3">
                      {interestedIdeas.map(idea => (
                        <Col key={idea._id} xs={12}>
                          <IdeaCard idea={idea} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-heart" style={{ fontSize: '2.5rem', color: 'var(--fk-border)' }} />
                      <p className="mt-3" style={{ color: 'var(--fk-text-muted)', fontSize: '0.875rem' }}>
                        You haven't expressed interest in any ideas yet.{' '}
                        <span style={{ color: 'var(--fk-primary-btn)', cursor: 'pointer', fontWeight: 600 }}
                          onClick={() => navigate('/marketplace')}>
                          Browse the marketplace
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </Tab>
            )}

          </Tabs>
        </Container>
      </div>
    </>
  )
}