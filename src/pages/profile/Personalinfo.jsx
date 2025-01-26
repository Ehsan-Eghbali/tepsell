import React from "react";
import { Card, Col, Row, CardBody, Label, Form, Input, FormFeedback, TabPane, } from "reactstrap";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import * as Yup from 'yup';


//redux
import { useFormik } from "formik";



const Personalinfo = () => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      Nationalcode: "",
      numbercall: "",
      Nickname: "",
      birthday: "",
      birthplace: "",
      idplace: "",
      serviceStatus: "",
      maritalStatus: "",
      educationLevel: "",
      universityName: "",
      email: "",
      personnelCode: "",
      city: "",
      state: "",
      zip: "",
      address: ""
    },
    // validationSchema: Yup.object({
    //   firstname: Yup.string().required("این فیلد اجباری است"),
    //   lastname: Yup.string().required("این فیلد اجباری است"),
    //   Nationalcode: Yup.string().required("این فیلد اجباری است"),
    //   numbercall: Yup.string().required("این فیلد اجباری است"),
    //   Nickname: Yup.string().required("این فیلد اجباری است"),
    //   birthday: Yup.string().required("این فیلد اجباری است"),
    //   birthplace: Yup.string().required("این فیلد اجباری است"),
    //   idplace: Yup.string().required("این فیلد اجباری است"),
    //   serviceStatus: Yup.string().required("این فیلد اجباری است"),
    //   maritalStatus: Yup.string().required("این فیلد اجباری است"),
    //   educationLevel: Yup.string().required("این فیلد اجباری است"),
    //   universityName: Yup.string().required("این فیلد اجباری است"),
    //   email: Yup.string().email("ایمیل نامعتبر است").required("این فیلد اجباری است"),
    //   password: Yup.string().required("این فیلد اجباری است"),
    //   city: Yup.string().required("این فیلد اجباری است"),
    //   state: Yup.string().required("این فیلد اجباری است"),
    //   zip: Yup.string().required("این فیلد اجباری است"),
    //   address: Yup.string().required("این فیلد اجباری است")
    // }),
    onSubmit: (values) => {
      console.log("Form values", values);
    }
  });

  return (
    <React.Fragment>
      <TabPane tabId="1" id="Personalinfo">
        <div className="profile-card mt-1">
          <div className="profile-card__header">
            <div className="profile-card__info">
              <span>اطلاعات همکار</span>
            </div>
          </div>
          <div className="profile-card">

            <Row>
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <Form onSubmit={formik.handleSubmit}>

                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-firstname-Input">نام</Label>
                            <Input
                              type="text"
                              name="firstname"
                              className="form-control"
                              id="formrow-firstname-Input"
                              placeholder="نام خود را وارد نمایید"
                              value={formik.values.firstname}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.firstname && formik.errors.firstname
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.firstname && formik.touched.firstname ? (
                              <FormFeedback type="invalid">
                                {formik.errors.firstname}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-email-Input">نام خانوادگی</Label>
                            <Input
                              type="text"
                              name="lastname"
                              className="form-control"
                              id="formrow-email-Input"
                              placeholder="نام خانوادگی را وارد کنید"
                              value={formik.values.lastname}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.lastname && formik.errors.lastname
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.email && formik.touched.email ? (
                              <FormFeedback type="invalid">
                                {formik.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={4}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-firstname-Input">کد ملی</Label>
                            <Input
                              type="number"
                              name="Nationalcode"
                              className="form-control"
                              id="formrow-firstname-Input"
                              placeholder="کد ملی 10 رقم"
                              value={formik.values.Nationalcode}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.Nationalcode && formik.errors.Nationalcode
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.Nationalcode && formik.touched.Nationalcode ? (
                              <FormFeedback type="invalid">
                                {formik.errors.Nationalcode}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col md={4}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-email-Input">شماره تماس </Label>
                            <Input
                              type="tel"
                              name="numbercall"
                              className="form-control"
                              id="formrow-email-Input"
                              placeholder="    شماره موبایل 11 رقم"
                              value={formik.values.numbercall}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.numbercall && formik.errors.numbercall
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.numbercall && formik.touched.numbercall ? (
                              <FormFeedback type="invalid">
                                {formik.errors.numbercall}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-email-Input">نام مستعار </Label>
                            <Input
                              type="text"
                              name="Nickname"
                              className="form-control"
                              id="formrow-email-Input"
                              placeholder="نام خانوادگی را وارد کنید"
                              value={formik.values.Nickname}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.Nickname && formik.errors.Nickname
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.Nickname && formik.touched.Nickname ? (
                              <FormFeedback type="invalid">
                                {formik.errors.Nickname}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={4}>
                          <div className="mb-3 d-flex flex-column">
                            <Label htmlFor="formrow-firstname-Input"> تاریخ تولد</Label>
                            <DatePicker
                              calendar={persian}
                              locale={persian_fa}
                              calendarPosition="bottom-right"
                              name="birthday"
                              placeholder="تاریخ تولد"
                              className="form-control"
                              id="formrow-birthday"
                              value={formik.values.birthday}
                              style={{ height: "38px", width: "100%" }}
                            />
                            {formik.errors.birthday && formik.touched.birthday ? (
                              <FormFeedback type="invalid">
                                {formik.errors.birthday}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col md={4}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-placeofbirth-Input">محل تولد</Label>
                            <Input
                              type="text"
                              name="placeofbirth"
                              className="form-control"
                              id="formrow-placeofbirth-Input"
                              placeholder="محل تولد خود را وارد کنید"
                              value={formik.values.placeofbirth}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={!!(formik.touched.placeofbirth && formik.errors.placeofbirth)}
                            />
                            {formik.errors.placeofbirth && formik.touched.placeofbirth && (
                              <FormFeedback type="invalid">
                                {formik.errors.placeofbirth}
                              </FormFeedback>
                            )}
                          </div>

                        </Col>
                        <Col md={4}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-placeofissue-Input">محل صدور شناسنامه</Label>
                            <Input
                              type="text"
                              name="placeOfIssue"
                              className="form-control"
                              id="formrow-placeofissue-Input"
                              placeholder="محل صدور شناسنامه را وارد کنید"
                              value={formik.values.placeOfIssue}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={!!(formik.touched.placeOfIssue && formik.errors.placeOfIssue)}
                            />
                            {formik.errors.placeOfIssue && formik.touched.placeOfIssue && (
                              <FormFeedback type="invalid">
                                {formik.errors.placeOfIssue}
                              </FormFeedback>
                            )}
                          </div>

                        </Col>
                      </Row>

                      <Row>
                        <Col md={3}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-service-status">وضعیت نظام وظیفه</Label>
                            <Input
                              type="select"
                              name="serviceStatus"
                              id="formrow-service-status"
                              className="form-control"
                              value={formik.values.serviceStatus}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.serviceStatus && formik.errors.serviceStatus ? true : false
                              }
                            >
                              <option value="" disabled>
                                انتخاب کنید
                              </option>
                              <option value="medical">معافیت پزشکی</option>
                              <option value="educational">معافیت تحصیلی</option>
                              <option value="completed">پایان خدمت</option>
                              <option value="serving">در حال خدمت</option>
                              <option value="none">ندارد</option>
                            </Input>
                            {formik.errors.serviceStatus && formik.touched.serviceStatus ? (
                              <FormFeedback type="invalid">
                                {formik.errors.serviceStatus}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-marital-status">وضعیت تأهل</Label>
                            <Input
                              type="select"
                              name="maritalStatus"
                              id="formrow-marital-status"
                              className="form-control"
                              value={formik.values.maritalStatus}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.maritalStatus && formik.errors.maritalStatus ? true : false
                              }
                            >
                              <option value="" disabled>
                                انتخاب کنید
                              </option>
                              <option value="single">مجرد</option>
                              <option value="married">متأهل</option>
                            </Input>
                            {formik.errors.maritalStatus && formik.touched.maritalStatus ? (
                              <FormFeedback type="invalid">
                                {formik.errors.maritalStatus}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-education-level">آخرین مدرک تحصیلی</Label>
                            <Input
                              type="select"
                              name="educationLevel"
                              id="formrow-education-level"
                              className="form-control"
                              value={formik.values.educationLevel}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.educationLevel && formik.errors.educationLevel ? true : false
                              }
                            >
                              <option value="" disabled>
                                انتخاب کنید
                              </option>
                              <option value="diploma">دیپلم</option>
                              <option value="associate">فوق دیپلم</option>
                              <option value="bachelor">کارشناسی</option>
                              <option value="master">کارشناسی ارشد</option>
                              <option value="phd">دکتری</option>
                            </Input>
                            {formik.errors.educationLevel && formik.touched.educationLevel ? (
                              <FormFeedback type="invalid">
                                {formik.errors.educationLevel}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-university-name">نام دانشگاه</Label>
                            <Input
                              type="text"
                              name="universityName"
                              id="formrow-university-name"
                              className="form-control"
                              placeholder="نام دانشگاه خود را وارد کنید"
                              value={formik.values.universityName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.universityName && formik.errors.universityName ? true : false
                              }
                            />
                            {formik.errors.universityName && formik.touched.universityName ? (
                              <FormFeedback type="invalid">
                                {formik.errors.universityName}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-email-Input">ایمیل</Label>
                            <Input
                              type="email"
                              name="email"
                              className="form-control"
                              id="formrow-email-Input"
                              placeholder="شناسه ایمیل خود را وارد کنید"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.email && formik.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.email && formik.touched.email ? (
                              <FormFeedback type="invalid">
                                {formik.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-personnelCode-Input">
                              کد پرسنلی
                            </Label>
                            <Input
                              type="number"
                              name="personnelCode"
                              className="form-control"
                              id="formrow-personnelCode-Input"
                              placeholder="کد پرسنلی خود را وارد کنید"
                              autoComplete="off"
                              value={formik.values.personnelCode}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={!!(formik.touched.personnelCode && formik.errors.personnelCode)}
                            />
                            {formik.errors.personnelCode && formik.touched.personnelCode && (
                              <FormFeedback type="invalid">
                                {formik.errors.personnelCode}
                              </FormFeedback>
                            )}
                          </div>

                        </Col>
                      </Row>

                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-InputCity">شهر محل سکونت</Label>
                            <Input
                              type="text"
                              name="city"
                              className="form-control"
                              id="formrow-InputCity"
                              placeholder="محل سکونت خود را وارد کنید"
                              value={formik.values.city}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.city && formik.errors.city
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.city && formik.touched.city ? (
                              <FormFeedback type="invalid">
                                {formik.errors.city}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-InputState">استان</Label>
                            <select
                              name="state"
                              id="formrow-InputState"
                              className="form-control"
                              value={formik.values.state}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option>انتخاب...</option>
                              <option>...</option>
                            </select>
                            {formik.errors.state && formik.touched.state ? (
                              <span className="text-danger">
                                {formik.errors.state}
                              </span>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-InputZip">کد پستی</Label>
                            <Input
                              type="text"
                              name="zip"
                              className="form-control"
                              id="formrow-InputZip"
                              placeholder="کد پستی خود را وارد کنید"
                              value={formik.values.zip}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={
                                formik.touched.zip && formik.errors.zip
                                  ? true
                                  : false
                              }
                            />
                            {formik.errors.zip && formik.touched.zip ? (
                              <FormFeedback type="invalid">
                                {formik.errors.zip}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-InputAddress">آدرس محل سکونت</Label>
                            <Input
                              type="text"
                              name="address"
                              className="form-control"
                              id="formrow-InputAddress"
                              placeholder="آدرس محل سکونت خود را وارد کنید"
                              value={formik.values.address}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              invalid={!!(formik.touched.address && formik.errors.address)}
                            />
                            {formik.errors.address && formik.touched.address && (
                              <FormFeedback type="invalid">
                                {formik.errors.address}
                              </FormFeedback>
                            )}
                          </div>

                        </Col>
                      </Row>

                      <div>
                        <button type="submit" className="btn btn-primary w-md">
                          ارسال
                        </button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>

            </Row>

          </div>


        </div>
      </TabPane>
    </React.Fragment>
  )
}
export default Personalinfo;
