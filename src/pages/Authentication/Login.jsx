import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import Pegah111 from "../../assets/images/Pegah111.png";

const Login = (props) => {
  // تنظیم عنوان صفحه
  document.title = "سامانه جامع منابع انسانی";

  // خواندن متغیر محیطی
  const API_URL = import.meta.env.VITE_APP_BACK_END_URL + "/auth/login";

  const dispatch = useDispatch();

  // اعتبارسنجی و مدیریت فرم با Formik
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
          .email("ایمیل نامعتبر است")
          .required("لطفا ایمیل خود را وارد کنید"),
      password: Yup.string().required("لطفا رمز عبور خود را وارد کنید"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate, API_URL));
    },
  });

  // انتخابگر برای خطاهای لاگین
  const LoginProperties = createSelector(
      (state) => state.Login,
      (login) => ({
        error: login.error,
      })
  );

  const { error } = useSelector(LoginProperties);

  const signIn = (type) => {
    dispatch(socialLogin(type, props.router.navigate, API_URL));
  };

  return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary-subtle">
                    <Row>
                      <Col xs={7}>
                        <div className="text-primary p-4">
                          <h5 className="text-primary">سامانه جامع منابع انسانی</h5>
                          <p>پگاه داده کاوان شریف</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src="" alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="auth-logo">
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                              src={Pegah111}
                              alt=""
                              className="rounded-circle"
                              height="34"
                          />
                        </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                      >
                        {error && <Alert color="danger">{error}</Alert>}

                        <div className="mb-3">
                          <Label className="form-label">ایمیل</Label>
                          <Input
                              name="email"
                              className="form-control"
                              placeholder="ایمیل خود را وارد کنید"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                  validation.touched.email && validation.errors.email
                              }
                          />
                          {validation.touched.email && validation.errors.email && (
                              <FormFeedback>{validation.errors.email}</FormFeedback>
                          )}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">رمز عبور</Label>
                          <Input
                              name="password"
                              autoComplete="off"
                              value={validation.values.password || ""}
                              type="password"
                              placeholder="رمز عبور خود را وارد کنید"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                  validation.touched.password &&
                                  validation.errors.password
                              }
                          />
                          {validation.touched.password &&
                              validation.errors.password && (
                                  <FormFeedback>{validation.errors.password}</FormFeedback>
                              )}
                        </div>

                        <div className="form-check">
                          <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                          />
                          <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                          >
                            مرا به خاطر بسپار
                          </label>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                              className="btn btn-primary btn-block"
                              type="submit"
                          >
                            ورود
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <Link to="/reset-password" className="text-muted">
                            <i className="mdi mdi-lock me-1" />
                            رمز عبور خود را فراموش کرده‌اید؟
                          </Link>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    حسابی ندارید؟{" "}
                    <Link to="/Contact-us" className="fw-medium text-primary">
                      با واحد منابع انسانی ارتباط بگیرید
                    </Link>
                  </p>
                  <p>
                    © {new Date().getFullYear()} ساخته شده توسط{" "}
                    <i className="mdi mdi-heart text-danger" /> پگاه داده کاوان شریف
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
  );
};

Login.propTypes = {
  router: PropTypes.object,
};

export default withRouter(Login);
