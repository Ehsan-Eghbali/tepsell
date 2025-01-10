import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import { Card, CardBody, CardTitle, Col, Container, Row, Table } from "reactstrap";

// TableContainer
import TableContainer from "/src/components/Common/TableContainer";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

//Import mini card widgets
import MiniCards from "./mini-card";

//Import Images


// import charts
import ApexRevenue from "../ApexRevenue";
import { getUserProfile } from "/src/store/actions";

const ContactsProfile = (props) => {

  document.title = "Profile | Skote - قالب مدیریتی و داشبورد Vite React ";

  const { userProfile, onGetUserProfile } = props;

  const miniCards = [
    {
      title: " قرداد های فعال",
      iconClass: "bx-check-circle",
      text: "قرداد فصل تابستان",
    },
    { title: "مدت زمان همکاری ", iconClass: "bx-hourglass", text: "1 سال و 8 ماه" },
    { title: "حقوق", iconClass: " bx bx-money", text: "تومان 22,000,000 " },
  ];

  useEffect(() => {
    onGetUserProfile();
  }, [onGetUserProfile]);


  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "انتظارات عملکردی",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "تاریخ آغاز",
        accessorKey: "startDate",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "تحویل پروژه",
        accessorKey: "deadline",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "امتیاز",
        accessorKey: "budget",
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="مخاطبین" breadcrumbItem="پروفایل" />

          <Row>
            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col xs="7">
                      <div className="text-primary p-3">
                        <h5 className="text-primary"> سارای عزیز خوش آمدی</h5>
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                      <img src="" alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="4">
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          src={userProfile.img}
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>
                      <h5 className="font-size-15 text-truncate">
                        {userProfile.name}
                      </h5>
                      <p className="text-muted mb-0 text-truncate">
                        {userProfile.designation}
                      </p>
                    </Col>

                    <Col sm={8}>
                      <div className="pt-4">
                        <Row>
                          <Col xs="6">
                            <h5 className="font-size-15">
                              {userProfile.projectCount}
                            </h5>
                            <p className="text-muted mb-0">پروژه ها</p>
                          </Col>
                          <Col xs="6">
                            <h5 className="font-size-15">
                              تومان {userProfile.revenue}
                            </h5>
                            <p className="text-muted mb-0">درآمد</p>
                          </Col>
                        </Row>
                        <div className="mt-4">
                          <Link to="" className="btn btn-primary  btn-sm">
                            مشاهده پروفایل{" "}
                            <i className="mdi mdi-arrow-left ms-1" />
                          </Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">اطلاعات شخصی</CardTitle>
                  <p className="text-muted mb-4">
                    {userProfile.personalDetail}
                  </p>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">نام و نام خانوادگی :</th>
                          <td>{userProfile.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">شماره تماس :</th>
                          <td>{userProfile.phone}</td>
                        </tr>
                        <tr>
                          <th scope="row">ایمیل :</th>
                          <td>{userProfile.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">موقعیت مکانی :</th>
                          <td>{userProfile.location}</td>
                        </tr>
                        <tr>
                          <th scope="row"> مدیر مستقیم :</th>
                          <td>{userProfile.location}</td>
                        </tr>
                        <tr>
                          <th scope="row">سطح مهارتی فعلی  :</th>
                          <td>{userProfile.location}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-5">تجربه</CardTitle>
                  <div>
                    <ul className="verti-timeline list-unstyled">
                      {(userProfile.experiences || [])?.map((experience, i) => (
                        <li
                          className={
                            experience.id === 1
                              ? "event-list active"
                              : "event-list"
                          }
                          key={"_exp_" + i}
                        >
                          <div className="event-timeline-dot">
                            <i
                              className={
                                experience.id === 1
                                  ? "bx bx-left-arrow-circle bx-fade-right"
                                  : "bx bx-left-arrow-circle"
                              }
                            />
                          </div>
                          <div className="d-flex">
                            <div className="me-3">
                              <i
                                className={
                                  "bx " +
                                  experience.iconClass +
                                  " h4 text-primary"
                                }
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div>
                                <h5 className="font-size-15">
                                  <Link
                                    to={experience.link}
                                    className="text-dark"
                                  >
                                    {experience.designation}
                                  </Link>
                                </h5>
                                <span className="text-primary">
                                  {experience.timeDuration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl="8">
              <Row>
                {(miniCards || [])?.map((card, key) => (
                  <MiniCards
                    title={card.title}
                    text={card.text}
                    iconClass={card.iconClass}
                    key={"_card_" + key}
                  />
                ))}
              </Row>
              <Card>
                {/* <CardBody>
                  <CardTitle className="mb-4">درآمد</CardTitle>
                  <div id="revenue-chart">
                    <ApexRevenue dataColors='["--bs-primary"]' />
                  </div>
                </CardBody> */}
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">انتظارات عملکردی همکار  </CardTitle>

                  <TableContainer
                    columns={columns}
                    data={userProfile.projects || []}
                    isGlobalFilter={false}
                    tableClass="table-nowrap table-hover mb-00"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ContactsProfile.propTypes = {
  userProfile: PropTypes.any,
  onGetUserProfile: PropTypes.func,
};

const mapStateToProps = ({ contacts }) => ({
  userProfile: contacts.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUserProfile: () => dispatch(getUserProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactsProfile));
