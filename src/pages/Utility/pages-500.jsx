import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

//Import Images


const Pages500 = () => {
   //meta title
   document.title = "500 Error Page | Skote - قالب مدیریتی و داشبورد Vite React ";

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 className="display-2 fw-medium" dir="ltr">
                  5<i className="bx bx-buoy bx-spin text-primary display-3" />0
                </h1>
                <h4 className="text-uppercase">خطای سرور داخلی</h4>
                <div className="mt-5 text-center">
                  <Link className="btn btn-primary " to="/dashboard">
                    بازگشت به داشبورد
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src="" alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Pages500
