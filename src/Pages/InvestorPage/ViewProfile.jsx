import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import { ideaService } from '../../../Services/ideaService'
import IdeaCard from '../../Components/cards/IdeaCard'
import SecondNavbar from '../../Components/Common/SecondNavbar'
import axios from 'axios'
import { investorService } from '../../../Services/InvestorServices'

export default function ViewProfile() {
    const { id } = useParams()
    const { user: currentUser } = useAuth()
    const navigate = useNavigate()

    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(true)
    const [ideas, setIdeas] = useState([])
    const [ideasLoading, setIdeasLoading] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const [messageSent, setMessageSent] = useState(false)

    useEffect(() => {
        fetchProfile()
    }, [id])

    const fetchProfile = async () => {
        try {
            setProfileLoading(true)
            const res = await axios.get(`/api/users/${id}`)
            const data = res.data.user || res.data
            setProfile(data)

            // Fetch this investor's interested ideas (or entrepreneur's ideas)
            if (data.role === 'investor') {
                setIdeasLoading(true)
                // const ideasRes = await axios.get(`/api/users/${id}/interested-ideas`)
                setIdeas(ideasRes.data.ideas || [])
                setIdeasLoading(false)
            } else if (data.role === 'entrepreneur') {
                setIdeasLoading(true)
                const ideasRes = await axios.get(`/api/ideas?author=${id}`)
                setIdeas(ideasRes.data.ideas || [])
                setIdeasLoading(false)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setProfileLoading(false)
        }
    }

    const handleFollow = () => setIsFollowing(prev => !prev)

    const handleMessage = () => {
        setMessageSent(true)
        // TODO: wire up to your messaging feature
        setTimeout(() => setMessageSent(false), 2000)
    }

    if (profileLoading) {
        return (
            <>
                <SecondNavbar />
                <div style={{ background: 'var(--fk-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)' }} />
                </div>
            </>
        )
    }

    if (!profile) {
        return (
            <>
                <SecondNavbar />
                <div style={{ background: 'var(--fk-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    <i className="bi bi-person-x" style={{ fontSize: '3rem', color: 'var(--fk-border)' }} />
                    <p style={{ color: 'var(--fk-text-muted)', fontWeight: 600 }}>User not found</p>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ padding: '6px 18px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--fk-border)', background: 'var(--fk-surface)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
                    >
                        Go back
                    </button>
                </div>
            </>
        )
    }

    const initials = profile.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'
    const isOwnProfile = currentUser?._id === profile._id

    const tabTitle = profile.role === 'investor'
        ? `Interested Ideas (${ideas.length})`
        : `Ideas (${ideas.length})`

    return (
        <>
            <SecondNavbar />

            <div style={{ background: 'var(--fk-bg)', minHeight: '100vh' }}>
                <Container style={{ paddingTop: '2rem', paddingBottom: '2rem', width: '50%' }}>

                    {/* ── Profile Card ── */}
                    <div className="fk-card p-4 mb-4" style={{ position: 'relative' }}>
                        <div style={{ height: 80, borderRadius: 'var(--radius-md) var(--radius-md) 0 0', margin: '-1rem -1rem 0' }} />

                        <div style={{ marginTop: '-40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <div
                                className="fk-avatar"
                                style={{ width: 120, height: 120, fontSize: '3rem', border: '4px solid var(--fk-surface)' }}
                            >
                                {initials}
                            </div>

                            {/* Action buttons — shown only to other users */}
                            {!isOwnProfile && (
                                <div style={{ paddingBottom: 4, display: 'flex', gap: 8 }}>
                                    <button
                                        onClick={handleFollow}
                                        style={{
                                            padding: '6px 16px',
                                            borderRadius: 'var(--radius-pill)',
                                            border: '1.5px solid var(--fk-border)',
                                            background: isFollowing ? 'var(--fk-primary-btn)' : 'var(--fk-surface)',
                                            color: isFollowing ? '#fff' : 'inherit',
                                            fontWeight: 600,
                                            fontSize: '0.82rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        <i className={`bi ${isFollowing ? 'bi-person-check-fill' : 'bi-person-plus'}`} />{' '}
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </button>

                                    <button
                                        onClick={handleMessage}
                                        style={{
                                            padding: '6px 16px',
                                            borderRadius: 'var(--radius-pill)',
                                            border: '1.5px solid var(--fk-border)',
                                            background: messageSent ? '#d1fae5' : 'var(--fk-surface)',
                                            color: messageSent ? '#065f46' : 'inherit',
                                            fontWeight: 600,
                                            fontSize: '0.82rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        <i className={`bi ${messageSent ? 'bi-check2' : 'bi-envelope'}`} />{' '}
                                        {messageSent ? 'Sent!' : 'Message'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Name, role badge, bio */}
                        <div style={{ paddingBottom: 4 }}>
                            <h1 style={{ fontWeight: 800, fontSize: '1.25rem', marginLeft: '1rem', marginBottom: '0.25rem', marginTop: '0.5rem', color: 'var(--fk-text-primary)' }}>
                                {profile.name}
                            </h1>

                            <span style={{
                                marginLeft: '1rem',
                                display: 'inline-block',
                                padding: '2px 10px',
                                borderRadius: 'var(--radius-pill)',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                background: profile.role === 'investor' ? '#fef3c7' : '#eef0ff',
                                color: profile.role === 'investor' ? '#92400e' : 'var(--fk-primary-btn)',
                                textTransform: 'capitalize',
                            }}>
                                {profile.role}
                            </span>

                            {/* Location */}
                            {profile.location && (
                                <span style={{ marginLeft: '10px', fontSize: '0.78rem', color: 'var(--fk-text-muted)' }}>
                                    <i className="bi bi-geo-alt" /> {profile.location}
                                </span>
                            )}

                            <br />

                            {profile.bio && (
                                <span style={{ marginLeft: '1rem', fontWeight: 500, fontSize: '1rem', color: 'var(--fk-text-primary)', display: 'inline-block', marginTop: '0.5rem' }}>
                                    {profile.bio}
                                </span>
                            )}

                            {/* Sector tags — investor only */}
                            {/* {profile.role === 'investor' && profile.sectors?.length > 0 && (
                                <div style={{ marginLeft: '1rem', marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {profile.sectors.map(s => (
                                        <span
                                            key={s}
                                            style={{
                                                fontSize: '0.72rem',
                                                fontWeight: 600,
                                                padding: '3px 10px',
                                                borderRadius: 'var(--radius-pill)',
                                                border: '1px solid var(--fk-border)',
                                                color: 'var(--fk-text-muted)',
                                                background: 'var(--fk-bg)',
                                            }}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            )} */}

                            {/* Ticket size — investor only */}
                            {profile.role === 'investor' && profile.ticketSize && (
                                <p style={{ marginLeft: '1rem', marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--fk-text-muted)' }}>
                                    <i className="bi bi-cash-coin" /> Ticket size: <strong style={{ color: 'var(--fk-text-primary)' }}>{profile.ticketSize}</strong>
                                </p>
                            )}

                            {/* Email — only visible to logged-in users */}
                            {currentUser && profile.email && (
                                <p style={{ marginLeft: '1rem', marginTop: '0.35rem', fontSize: '0.82rem', color: 'var(--fk-text-muted)' }}>
                                    <i className="bi bi-envelope" /> {profile.email}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ── Stats row ── */}
                    <div className="row justify-content-center gap-3 mb-4" style={{ fontSize: '0.875rem' }}>
                        <div className="col text-center">
                            <div className="fk-card h-100 p-4 d-flex flex-column" style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>
                                {ideas.length}
                                <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>
                                    {profile.role === 'investor' ? 'Interested' : 'Ideas'}
                                </div>
                            </div>
                        </div>

                        <div className="col text-center">
                            <div className="fk-card h-100 p-4 d-flex flex-column" style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>
                                {profile.followersCount ?? 0}
                                <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>Followers</div>
                            </div>
                        </div>

                        <div className="col text-center">
                            <div className="fk-card h-100 p-4 d-flex flex-column" style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>
                                {ideas.length}
                                <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>Posts</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Tabs ── */}
                    <Tabs defaultActiveKey="ideas" className="mb-3" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                        <Tab eventKey="ideas" title={tabTitle}>
                            <div className="mt-3">
                                {ideasLoading ? (
                                    <div className="text-center py-5">
                                        <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)' }} />
                                    </div>
                                ) : ideas.length > 0 ? (
                                    <Row className="g-3">
                                        {ideas.map(idea => (
                                            <Col key={idea._id} xs={12}>
                                                <IdeaCard idea={idea} />
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <div className="text-center py-5">
                                        <i
                                            className={`bi ${profile.role === 'investor' ? 'bi-heart' : 'bi-lightbulb'}`}
                                            style={{ fontSize: '2.5rem', color: 'var(--fk-border)' }}
                                        />
                                        <p className="mt-3" style={{ color: 'var(--fk-text-muted)', fontSize: '0.875rem' }}>
                                            {profile.role === 'investor'
                                                ? `${profile.name} hasn't expressed interest in any ideas yet.`
                                                : `${profile.name} hasn't submitted any ideas yet.`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Tab>
                    </Tabs>

                </Container>
            </div>
        </>
    )
}