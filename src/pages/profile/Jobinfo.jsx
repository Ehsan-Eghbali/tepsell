import React, { useState } from "react";
import {
    Card, Col, Row, CardBody, Label, Form, Input, FormFeedback, Button, TabPane, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";


import { useFormik } from "formik";


import "moment/locale/fa"; // Persian locale
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"



// const formik = useFormik({
//         initialValues: {
//           firstname: "",
//           email: "",
//           password: "",
//           city: "",
//           state: "",
//           zip: "",
//           check: "",
//           jobTitle: "",
//           jobTitleInsurance: "",
//           employeeId: "",
//           skillLevel: "",
//           insuranceJobCode: "",
//           jobLevel: "",
//           team: "",
//           unit: "",
//           nickname: "",
//           serviceStatus: "",
//           manager: "",
//           contractType: "",
//           contractForm: "",
//           contractTypeNda: "",
//           entryDate: "",
//           exitDate: "",
//           contractNumber: "",
//           insuranceType: "",
//           dependents: "",
//         },
//     });

const Jobinfo = () => {
    const [isStandardModalOpen, setIsStandardModalOpen] = useState(false);
    const [formRows, setFormRows] = useState([
        { id: 1, name: "", email: "", subject: "", resume: "", message: "" }
    ]);

    const onAddFormRow = () => {
        const newRow = { id: Math.floor(Math.random() * (30 - 20)) + 20, name: "", email: "", subject: "", resume: "", message: "" };
        setFormRows([...formRows, newRow]);
    };
    const formik = useFormik({
        initialValues: {
            firstname: "",
            email: "",
            password: "",
            city: "",
            state: "",
            zip: "",
            check: "",
        },
    });
    return (
        <React.Fragment>
            <TabPane tabId="2" id="buy">
                <div className="profile-card mt-1">
                    <div className="profile-card__header">
                        <div className="profile-card__info">
                            <span>اطلاعات شغلی همکار</span>
                        </div>
                    </div>
                    <div className="profile-card">

                        <div className="mb-3 mt-4 mx-3">
                            <h5>اطلاعات شغل</h5>
                        </div>

                        <Row>
                            <Col xl={12}>
                                <Card>
                                    <CardBody>
                                        <Form onSubmit={formik.handleSubmit}>

                                            <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="job-title-input">سمت شغلی</Label>
                                                        <Input
                                                            type="text"
                                                            name="jobTitle"
                                                            className="form-control"
                                                            id="job-title-input"
                                                            placeholder="عنوان شغلی فرد را وارد کنید"
                                                            value={formik.values.jobTitle}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={formik.touched.jobTitle && !!formik.errors.jobTitle}
                                                        />
                                                        {formik.touched.jobTitle && formik.errors.jobTitle && (
                                                            <FormFeedback type="invalid">{formik.errors.jobTitle}</FormFeedback>
                                                        )}
                                                    </div>

                                                </Col>

                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="job-title-insurance-input">سمت شغلی در بیمه</Label>
                                                        <Input
                                                            type="text"
                                                            name="jobTitleInsurance"
                                                            className="form-control"
                                                            id="job-title-insurance-input"
                                                            placeholder="سمت شغلی در بیمه را وارد کنید"
                                                            value={formik.values.jobTitleInsurance}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={formik.touched.jobTitleInsurance && !!formik.errors.jobTitleInsurance}
                                                        />
                                                        {formik.touched.jobTitleInsurance && formik.errors.jobTitleInsurance && (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.jobTitleInsurance}
                                                            </FormFeedback>
                                                        )}
                                                    </div>

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={3}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="employee-id-input">شماره پرسنلی</Label>
                                                        <Input
                                                            type="number"
                                                            name="employeeId"
                                                            className="form-control"
                                                            id="employee-id-input"
                                                            placeholder="شماره پرسنلی 10 رقم"
                                                            value={formik.values.employeeId}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={formik.touched.employeeId && !!formik.errors.employeeId}
                                                        />
                                                        {formik.touched.employeeId && formik.errors.employeeId && (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.employeeId}
                                                            </FormFeedback>
                                                        )}
                                                    </div>

                                                </Col>

                                                <Col md={3}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="skill-level-select">رده مهارتی</Label>
                                                        <select
                                                            name="skillLevel"
                                                            className={`form-control ${formik.touched.skillLevel && formik.errors.skillLevel ? 'is-invalid' : ''}`}
                                                            id="skill-level-select"
                                                            value={formik.values.skillLevel}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        >
                                                            <option value="" disabled>انتخاب رده مهارتی</option>
                                                            <option value="junior1">جونیور 1</option>
                                                            <option value="junior2">جونیور 2</option>
                                                            <option value="junior3">جونیور 3</option>
                                                            <option value="midLevel1">میدلول 1</option>
                                                            <option value="midLevel2">میدلول 2</option>
                                                            <option value="midLevel3">میدلول 3</option>
                                                            <option value="senior1">سینیور 1</option>
                                                            <option value="senior2">سینیور 2</option>
                                                            <option value="senior3">سینیور 3</option>
                                                        </select>
                                                        {formik.touched.skillLevel && formik.errors.skillLevel && (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.skillLevel}
                                                            </FormFeedback>
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="insurance-job-code-input">کد شغلی بیمه</Label>
                                                        <Input
                                                            type="text"
                                                            name="insuranceJobCode"
                                                            className="form-control"
                                                            id="insurance-job-code-input"
                                                            placeholder="کد شغلی بیمه را وارد کنید"
                                                            value={formik.values.insuranceJobCode}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={formik.touched.insuranceJobCode && !!formik.errors.insuranceJobCode}
                                                        />
                                                        {formik.touched.insuranceJobCode && formik.errors.insuranceJobCode && (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.insuranceJobCode}
                                                            </FormFeedback>
                                                        )}
                                                    </div>

                                                </Col>
                                                <Col md={3}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="job-level-select">رده شغلی</Label>
                                                        <select
                                                            name="jobLevel"
                                                            className={`form-control ${formik.touched.jobLevel && formik.errors.jobLevel ? 'is-invalid' : ''}`}
                                                            id="job-level-select"
                                                            value={formik.values.jobLevel}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        >
                                                            <option value="" disabled>انتخاب رده شغلی</option>
                                                            <option value="intern">کارآموز</option>
                                                            <option value="expert">کارشناس</option>
                                                            <option value="seniorExpert">کارشناس ارشد</option>
                                                            <option value="supervisor">سرپرست</option>
                                                            <option value="middleManager">مدیر میانی</option>
                                                            <option value="seniorManager">مدیر ارشد</option>
                                                            <option value="ceo">مدیر عامل</option>
                                                        </select>
                                                        {formik.touched.jobLevel && formik.errors.jobLevel && (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.jobLevel}
                                                            </FormFeedback>
                                                        )}
                                                    </div>

                                                </Col>
                                            </Row>

                                            <div className="mb-3 mt-4">
                                                <h5>اطلاعات تیمی</h5>
                                            </div>

                                            <Row>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="team-select">تیم</Label>
                                                        <Input
                                                            type="select"
                                                            name="team"
                                                            className={`form-control ${formik.touched.team && formik.errors.team ? 'is-invalid' : ''}`}
                                                            id="team-select"
                                                            value={formik.values.team}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        >
                                                            <option value="">انتخاب کنید</option>
                                                            <option value="Admin">Admin</option>
                                                            <option value="Infrastructure">Infrastructure</option>
                                                            <option value="Customer Success">Customer Success</option>
                                                            <option value="Tech Brain">Tech Brain</option>
                                                            <option value="Marketing">Marketing</option>
                                                            <option value="Product">Product</option>
                                                            <option value="Sales & Marketing">Sales & Marketing</option>
                                                            <option value="Partnership & Sales">Partnership & Sales</option>
                                                            <option value="Administration Support">Administration Support</option>
                                                            <option value="Customer Support">Customer Support</option>
                                                            <option value="Business Development">Business Development</option>
                                                            <option value="Studio">Studio</option>
                                                            <option value="SSP">SSP</option>
                                                            <option value="Data">Data</option>
                                                            <option value="Extensell">Extensell</option>
                                                        </Input>
                                                        {formik.touched.team && formik.errors.team && (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.team}
                                                            </FormFeedback>
                                                        )}
                                                    </div>


                                                </Col>

                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="unit-select">واحد</Label>
                                                        <Input
                                                            type="select"
                                                            name="unit"
                                                            className={`form-control ${formik.touched.unit && formik.errors.unit ? 'is-invalid' : ''}`}
                                                            id="unit-select"
                                                            value={formik.values.unit}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        >
                                                            <option value="">انتخاب کنید</option>
                                                            <option value="Tapsell">Tapsell</option>
                                                            <option value="Blitzlab">Blitzlab</option>
                                                            <option value="Pegah">Pegah</option>
                                                            <option value="Finance">Finance</option>
                                                            <option value="Human Resources">Human Resources</option>
                                                            <option value="Funtory">Funtory</option>
                                                            <option value="Metrix">Metrix</option>
                                                            <option value="Media House">Media House</option>
                                                            <option value="Infrastructure">Infrastructure</option>
                                                        </Input>
                                                        {formik.touched.unit && formik.errors.unit && (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.unit}
                                                            </FormFeedback>
                                                        )}
                                                    </div>


                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-nickname-Input">نوع همکاری</Label>
                                                        <Input
                                                            type="select"
                                                            name="nickname"
                                                            className="form-control"
                                                            id="formrow-nickname-Input"
                                                            value={formik.values.nickname}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={formik.touched.nickname && formik.errors.nickname ? true : false}
                                                        >
                                                            <option value="">انتخاب کنید</option>
                                                            <option value="دورکار">دورکار</option>
                                                            <option value="حضوری">حضوری</option>
                                                            <option value="هیبرید">هیبرید</option>
                                                        </Input>
                                                        {formik.errors.nickname && formik.touched.nickname ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.nickname}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={3}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-service-status">وضعیت همکاری</Label>
                                                        <Input
                                                            type="select"
                                                            name="serviceStatus"
                                                            id="formrow-service-status"
                                                            className="form-control"
                                                            value={formik.values.serviceStatus}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={formik.touched.serviceStatus && formik.errors.serviceStatus ? true : false}
                                                        >
                                                            <option value="">انتخاب کنید</option>
                                                            <option value="fullTime">تمام وقت</option>
                                                            <option value="partTime">پاره وقت</option>
                                                            <option value="projectBased">پروژه ای</option>
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
                                                        <Label htmlFor="formrow-manager">مدیر مستقیم</Label>
                                                        <Input
                                                            type="text"
                                                            name="manager"
                                                            id="formrow-manager"
                                                            className={`form-control ${formik.touched.manager && formik.errors.manager ? 'is-invalid' : ''}`}
                                                            value={formik.values.manager}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="نام مدیر را وارد کنید"
                                                        />
                                                        {formik.errors.manager && formik.touched.manager ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.manager}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                </Col>

                                                {/* <Col md={3}>
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
                                  </Col> */}
                                            </Row>

                                            <div className="mb-3 mt-4">
                                                <h5>اطلاعات قراردادی</h5>
                                            </div>

                                            <Row>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-contract-type">نوع قرارداد</Label>
                                                        <Input
                                                            type="select"
                                                            name="contractType"
                                                            className="form-control"
                                                            id="formrow-contract-type"
                                                            value={formik.values.contractType}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.contractType && formik.errors.contractType ? true : false
                                                            }
                                                        >
                                                            <option value="">انتخاب نوع قرارداد</option>
                                                            <option value="full_time">تمام وقت</option>
                                                            <option value="part_time">پاره وقت</option>
                                                            <option value="contract">پیمانکاری</option>
                                                        </Input>
                                                        {formik.errors.contractType && formik.touched.contractType ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.contractType}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                </Col>
                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-contract-type">شکل قرارداد</Label>
                                                        <Input
                                                            type="select"
                                                            name="contractForm"
                                                            className="form-control"
                                                            id="formrow-contract-type"
                                                            value={formik.values.Contractform}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.Contractform && formik.errors.Contractform ? true : false
                                                            }
                                                        >
                                                            <option value="">انتخاب شکل قرارداد</option>
                                                            <option value="official">رسمی</option>
                                                            <option value="informal">غیر رسمی</option>
                                                            <option value="soldier">سرباز</option>
                                                        </Input>
                                                        {formik.errors.Contractform && formik.touched.Contractform ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.Contractform}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col md={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-contract-type">نوع قرارداد nda</Label>
                                                        <Input
                                                            type="select"
                                                            name="contractTypenda"
                                                            className="form-control"
                                                            id="formrow-contract-type"
                                                            value={formik.values.contractTypenda}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.contractTypenda && formik.errors.contractTypenda ? true : false
                                                            }
                                                        >
                                                            <option value="">انتخاب نوع قرارداد</option>
                                                            <option value="technical">فنی</option>
                                                            <option value="non-technical">غیر فنی</option>
                                                        </Input>
                                                        {formik.errors.contractTypenda && formik.touched.contractTypenda ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.contractTypenda}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-entry-date">تاریخ ورود همکار</Label>
                                                        <Input
                                                            type="date"
                                                            name="entryDate"
                                                            className="form-control"
                                                            id="formrow-entry-date"
                                                            value={formik.values.entryDate}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.entryDate && formik.errors.entryDate ? true : false
                                                            }
                                                        />
                                                        {formik.errors.entryDate && formik.touched.entryDate ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.entryDate}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                </Col>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-exit-date">تاریخ خروج همکار</Label>
                                                        <Input
                                                            type="date"
                                                            name="exitDate"
                                                            className="form-control"
                                                            id="formrow-exit-date"
                                                            value={formik.values.exitDate}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.exitDate && formik.errors.exitDate ? true : false
                                                            }
                                                        />
                                                        {formik.errors.exitDate && formik.touched.exitDate ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.exitDate}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                </Col>

                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-contract-number">شماره قرارداد</Label>
                                                        <Input
                                                            type="number"
                                                            name="contractNumber"
                                                            className="form-control"
                                                            id="formrow-contract-number"
                                                            placeholder="شماره قرارداد خود را وارد کنید"
                                                            value={formik.values.contractNumber}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.contractNumber && formik.errors.contractNumber
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {formik.errors.contractNumber && formik.touched.contractNumber ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.contractNumber}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                </Col>
                                            </Row>

                                            <div className="mb-3 mt-4">
                                                <h5>بیمه تکمیلی و سایر</h5>
                                            </div>

                                            <Row className="d-flex align-items-center">
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-insurance-type">نوع بیمه تکمیلی</Label>
                                                        <Input
                                                            type="select"
                                                            name="insuranceType"
                                                            className="form-control"
                                                            id="formrow-insurance-type"
                                                            value={formik.values.insuranceType}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.insuranceType && formik.errors.insuranceType ? true : false
                                                            }
                                                        >
                                                            <option value="">انتخاب نوع بیمه تکمیلی</option>
                                                            <option value="planOne">طرح یک</option>
                                                            <option value="planTwo">طرح دو</option>
                                                        </Input>
                                                        {formik.errors.insuranceType && formik.touched.insuranceType ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.insuranceType}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>


                                                </Col>
                                                <Col lg={4}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="formrow-dependents">افراد تحت تکفل</Label>
                                                        <Input
                                                            type="select"
                                                            name="dependents"
                                                            className="form-control"
                                                            id="formrow-dependents"
                                                            value={formik.values.dependents}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            invalid={
                                                                formik.touched.dependents && formik.errors.dependents ? true : false
                                                            }
                                                        >
                                                            <option value="">انتخاب وضعیت افراد تحت تکفل</option>
                                                            <option value="yes">دارد</option>
                                                            <option value="no">ندارد</option>
                                                        </Input>
                                                        {formik.errors.dependents && formik.touched.dependents ? (
                                                            <FormFeedback type="invalid">
                                                                {formik.errors.dependents}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>


                                                </Col>

                                                <Col lg={4}>
                                                    <Button
                                                        onClick={() => {
                                                            tog_standard();
                                                        }}
                                                        type="button"
                                                        color="warning"
                                                        className="btn-label mt-2"
                                                    >
                                                        <i className="bx bx-smile label-icon"></i> افزودن افراد تحت تکفل
                                                    </Button>
                                                    <Modal
                                                        isOpen={isStandardModalOpen}
                                                        toggle={() => {
                                                            setIsStandardModalOpen(!isStandardModalOpen);
                                                        }}
                                                    >
                                                        <ModalHeader
                                                            toggle={() => {
                                                                setIsStandardModalOpen(!isStandardModalOpen);
                                                            }}
                                                        >
                                                            افزودن افراد تحت تکفل
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            {/* <ModalContent /> */}
                                                            <Row>
                                                                <Col xs={12}>
                                                                    <Card>
                                                                        <CardBody>
                                                                            <h6 className="mb-4 card-title">اطلاعات را وارد کنید</h6>
                                                                            <Form className="repeater" encType="multipart/form-data">
                                                                                <div>
                                                                                    {(formRows || []).map((formRow, key) => (
                                                                                        <Row key={key}>
                                                                                            <Col lg={3} className="mb-3">
                                                                                                <label htmlFor="name">نام خانوادگی</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="name"
                                                                                                    name={`name_${formRow.id}`}
                                                                                                    value={formRow.name}
                                                                                                    onChange={(e) =>
                                                                                                        handleInputChange(
                                                                                                            formRow.id,
                                                                                                            "name",
                                                                                                            e.target.value
                                                                                                        )
                                                                                                    }
                                                                                                    className="form-control"
                                                                                                    placeholder="نام را وارد کنید"
                                                                                                />
                                                                                            </Col>

                                                                                            <Col lg={2} className="mb-3">
                                                                                                <label htmlFor="natioalcodeb">کدملی</label>
                                                                                                <input
                                                                                                    type="number"
                                                                                                    id="natioalcodeb"
                                                                                                    name={`natioalcodeb_${formRow.id}`}
                                                                                                    value={formRow.natioalcodeb}
                                                                                                    onChange={(e) =>
                                                                                                        handleInputChange(
                                                                                                            formRow.id,
                                                                                                            "natioalcodeb",
                                                                                                            e.target.value
                                                                                                        )
                                                                                                    }
                                                                                                    className="form-control"
                                                                                                // placeholder="ایمیل را وارد کنید"
                                                                                                />
                                                                                            </Col>

                                                                                            <Col lg={2} className="mb-3">
                                                                                                <label htmlFor="subject">تاریخ تولد</label>
                                                                                                <input
                                                                                                    calendar={persian}
                                                                                                    locale={persian_fa}
                                                                                                    calendarPosition="bottom-right"
                                                                                                    id="subject"
                                                                                                    name={`subject_${formRow.id}`}
                                                                                                    value={formRow.subject}
                                                                                                    onChange={(e) =>
                                                                                                        handleInputChange(
                                                                                                            formRow.id,
                                                                                                            "subject",
                                                                                                            e.target.value
                                                                                                        )
                                                                                                    }
                                                                                                    className="form-control"
                                                                                                // placeholder="موضوع را وارد کنید"
                                                                                                />
                                                                                            </Col>

                                                                                            <Col lg={2} className="mb-3">
                                                                                                <label htmlFor="resume">نام پدر</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    id="resume"
                                                                                                    name={`resume_${formRow.id}`}
                                                                                                    value={formRow.resume}
                                                                                                    onChange={(e) =>
                                                                                                        handleInputChange(
                                                                                                            formRow.id,
                                                                                                            "resume",
                                                                                                            e.target.value
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </Col>

                                                                                            <Col lg={2} className="align-self-center">
                                                                                                <div className="d-grid">
                                                                                                    <input
                                                                                                        type="button"
                                                                                                        className="btn btn-primary"
                                                                                                        value="حذف"
                                                                                                        onClick={() => onDeleteFormRow(formRow.id)}
                                                                                                    />
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    ))}
                                                                                </div>
                                                                                <input
                                                                                    type="button"
                                                                                    className="btn btn-success mt-3 mt-lg-0"
                                                                                    value="افزودن"
                                                                                    onClick={() => onAddFormRow()}
                                                                                />
                                                                            </Form>
                                                                        </CardBody>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button
                                                                type="button"
                                                                onClick={() => {
                                                                    tog_standard();
                                                                }}
                                                                color="secondary "
                                                            >
                                                                بستن
                                                            </Button>
                                                            <Button type="button" color="primary ">
                                                                ذخیره تغییرات
                                                            </Button>
                                                        </ModalFooter>
                                                    </Modal>

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
export default Jobinfo;
