import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={12}>
              <div className="text-sm-center d-none d-sm-block">
                طراحی و توسعه منابع توسط انسانی پگاه داده کاوان شریف
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer
