import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

//Import Cards
import CardMaintenance from "./card-maintenance"

//Import Images




const PagesMaintenance = () => {

    //meta title
    document.title = "ارتباط با واحد منابع انسانی ";

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2"></i>
        </Link>
      </div>
      <section className="my-5 pt-sm-5">
        <Container>
          <Row>
            <Col xs="12" className="text-center">
              <div className="home-wrapper">
                <div className="mb-5">
                  <Link to="/" className="d-block auth-logo">
                    <img
                      src={logodark}
                      alt=""
                      height="18"
                      className="auth-logo-dark mx-auto"
                    />
                    <img
                      src={logolight}
                      alt=""
                      height="18"
                      className="auth-logo-light mx-auto"
                    />
                  </Link>
                </div>

                <Row className="justify-content-center">
                  <Col sm={4}>
                    <div className="maintenance-img">
                      <img
                        src={maintenance}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                    </div>
                  </Col>
                </Row>
                <h3 className="mt-5">حساب کاربری ندارید ؟</h3>
                <p>جهت دریافت حساب کاربری با واحد منابع انسانی ارتباط بگیرید</p>

                <Row>
                  <CardMaintenance>
                    <i className=" bx bx-user  mb-4 h1 text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      مراجعه حضوری به واحد منابع انسانی
                    </h5>
                    <p className="text-muted mb-0">
                      جهت دریافت نام کاربری و رمز عبور میتوانید به واحد منابع انسانی
                      واقع در طبقه چهارم ساختمان آناهیتا مراجعه کنید
                    </p>
                  </CardMaintenance>

                  <CardMaintenance>
                    <i className=" bx bxl-telegram  mb-4 h1 text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      از طریق تلگرام ارتباط بگیرید
                    </h5>
                    <p className="text-muted mb-0">
                      در تلگرام به آیدی @HR-Pegah ارتباط بگیرید
                    </p>
                  </CardMaintenance>

                  <CardMaintenance>
                    <i className="bx bx-envelope mb-4 h1 text-primary" />
                    <h5 className="font-size-15 text-uppercase">
                      از طریق ایمیل ارتباط بگیرید
                    </h5>
                    <p className="text-muted mb-0">
                       از طریق ایمیل به آدرس زیر ارتباط بگیرید
                      <Link
                        to="mailto:no-reply@domain.com"
                        className="text-decoration-underline"
                      >
                        hr@tapsell.ir
                      </Link>
                    </p>
                  </CardMaintenance>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default PagesMaintenance
