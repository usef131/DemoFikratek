import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import InvestorCard from '../../Components/cards/InvestorCard'
import axios from 'axios'
import SecondNavbar from '../../Components/Common/SecondNavbar'

export default function Investors() {
  const [investors, setInvestors] = useState([])

  useEffect(() => {
    fetchInvestors()
  }, [])

  const fetchInvestors = async () => {
    try {
      const res = await axios.get('/api/users/investors')
      setInvestors(res.data.investors)
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <>
    <SecondNavbar />
    <Container className="py-4">
      

      <Row>
        {investors.map((investor) => (
          <Col md={4} key={investor._id} className="mb-4">
            <InvestorCard investor={investor} />
          </Col>
        ))}
      </Row>
    </Container>
  
 </>
)
}