import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <a href='https://www.linkedin.com/in/prasad-patil-087a561b1'>
              Copyright &copy; ProShop
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
