import React from "react"
import CarouselPage from "./CarouselPage"
import { Col, Container, Row } from "reactstrap"

// import images


import { Link } from "react-router-dom"

const EmailVerification2 = () => {
  //meta title
  document.title = "Email Verification 2 | Skote - قالب مدیریتی و داشبورد Vite React ";

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col cl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/" className="d-block auth-logo">
                        <img
                          src={logoDark}
                          alt=""
                          height="18"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logoLight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div className="text-center">
                        <div className="avatar-md mx-auto">
                          <div className="avatar-title rounded-circle bg-light">
                            <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                          </div>
                        </div>
                        <div className="p-2 mt-4">
                          <h4>ایمیل خود را تایید کنید</h4>
                          <p>
                            ما ایمیل تأیید را برای شما ارسال کرده ایم{" "}
                            <span className="fw-semibold">example@abc.com</span>
                            , لطفا آن را چک کنید
                          </p>
                          <div className="mt-4">
                            <a href="/" className="btn btn-success w-md">
                              تایید ایمیل
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Skote. ساخته شده توسط{" "}
                        <i className="mdi mdi-heart text-danger"></i> 
                        فاطمه کاظمی زاده
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default EmailVerification2;
