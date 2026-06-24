import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner, Tab, Tabs, Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../../../Context/AuthContext'
import { ideaService } from '../../../Services/ideaService'
import IdeaCard from '../../Components/cards/IdeaCard'
import { FiHome, FiCompass, FiGift, FiAward, FiUser, FiLogOut } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useIdeas } from '../../../Context/IdeaContext'
import SecondNavbar from '../../Components/Common/SecondNavbar'

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { myIdeas, myIdeasLoading, fetchMyIdeas } = useIdeas()

  const [interestedIdeas, setInterestedIdeas]     = useState([])
  const [interestedLoading, setInterestedLoading] = useState(false)

  useEffect(() => {
    if (user?.role === 'entrepreneur') {
      fetchMyIdeas()
    }
    if (user?.role === 'investor') {
      setInterestedLoading(true)
      ideaService.getInterestedIdeas()
        .then(d => setInterestedIdeas(d.ideas || []))
        .catch(() => {})
        .finally(() => setInterestedLoading(false))
    }
  }, [user?._id])

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <>
     {/* ── Navbar ── */}

      <SecondNavbar/>

      <div style={{ background: 'var(--fk-bg)', minHeight: '100vh' }}>
        <Container style={{ paddingTop: '2rem', paddingBottom: '2rem', width: '50%'}}>

          {/* ── Profile Card ── */}
          <div className="fk-card p-4 mb-4" style={{ position: 'relative' }}>
            <div style={{ height: 80, borderRadius: 'var(--radius-md) var(--radius-md) 0 0', margin: '-1rem -1rem 0' }} />

            <div style={{ marginTop: '-40px', display: 'flex', alignItems: 'flex-end', gap: 16 ,display: 'flex',justifyContent: 'space-between'}}>
              <div className="fk-avatar" style={{ width: 120, height: 120, fontSize: '3rem', border: '4px solid var(--fk-surface)' }}>
                {initials}
               
              </div>
              <div style={{ 
                paddingBottom: 4 }}>
               <button onClick={() => navigate('/edit-profile')} style={{
                 
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)', 
                border: '1.5px solid var(--fk-border)',
                background: 'var(--fk-surface)', 
                fontWeight: 600, 
                fontSize: '0.82rem',
                cursor: 'pointer', 
                gap: 6,
              }}>
                <i className=" bi bi-gear" /> Edit Profile
               </button>
              </div>
              
            </div>
            <div style={{ paddingBottom: 4 }}>
                <h1 style={{ fontWeight: 800, fontSize: '1.25rem', marginLeft: '1rem', marginBottom: '0.25rem' ,marginTop: '0.5rem', color: 'var(--fk-text-primary)' }}>
                  {user?.name}
                </h1>
                <span style={{
                  marginBottom: '0.25rem' ,
                  marginTop: '0.5rem',
                  marginLeft: '1rem',
                  display: 'inline-block',
                  padding: '2px 10px ',
                  borderRadius: 'var(--radius-pill)', 
                  fontSize: '0.72rem', fontWeight: 600,
                  background: user?.role === 'investor' ? '#fef3c7' : '#eef0ff',
                  color: user?.role === 'investor' ? '#92400e' : 'var(--fk-primary-btn)',
                  textTransform: 'capitalize',
                }}>
                {user?.role}  
                </span>
                <br/>
                <span style={{marginBottom: '0.25rem' ,marginTop: '0.5rem',marginLeft: '1rem',fontWeight: 500, fontSize: '1rem', marginBottom: '0.15rem', color: 'var(--fk-text-primary)'
                }}>
                  {user?.bio}
                </span>
                
              </div>
            
          </div>
              {/* Stats row */}
          <div className="row justify-content-center gap-3 mb-4" style={{ fontSize: '0.875rem' }}>
                <div className="col text-center">
                <div className="fk-card h-100 p-4  d-flex flex-column " style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>
                  {user?.role === 'investor' ? interestedIdeas.length : myIdeas.length}
                
                <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>
                  {user?.role === 'investor' ? 'Interested' : 'Ideas'}
                </div>
                </div>
                </div>

                <div className="col text-center">
                <div  className="fk-card h-100 p-4 d-flex flex-column " style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>0 
                <div  style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>Followers</div>
                </div>
                </div>

                <div className="col text-center">
                <div  className="fk-card h-100 p-4 d-flex flex-column " style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>
                   {user?.role === 'investor' ? interestedIdeas.length : myIdeas.length}
                <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}> Posts</div>
                </div>
               
              </div>
            </div>
          {/* ── Tabs ── */}
          <Tabs defaultActiveKey="ideas" className="mb-3" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
           
            

            {/* Entrepreneur tab */}
            {user?.role === 'entrepreneur' && (
              <Tab eventKey="ideas" title={`My Ideas (${myIdeas.length})`}>
                <div className="mt-3">
                  {myIdeasLoading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)' }} />
                    </div>
                  ) : myIdeas.length > 0 ? (
                    <Row className="g-3 ">
                      {myIdeas.map(idea => (
                        <Col key={idea._id} xs={12} >
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

            {/* Investor tab */}
            {user?.role === 'investor' && (
              <Tab eventKey="ideas" title={`Interested Ideas (${interestedIdeas.length})`}>
                <div className="mt-3">
                  {interestedLoading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)' }} />
                    </div>
                  ) : interestedIdeas.length > 0 ? (
                    <Row className="g-3">
                      {interestedIdeas.map(idea => (
                        <Col key={idea._id} xs={12} >
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