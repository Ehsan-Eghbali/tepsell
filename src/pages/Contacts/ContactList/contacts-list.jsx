import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner"
import { Card, CardBody, Col, Container, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback, Input, Form, Button, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Badge } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "/src/store/contacts/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const ContactsList = () => {
  //meta title
  document.title = "لیست پرسنلی ";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contact, setContact] = useState();
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      status: (contact && contact.status) || "",
      unit: (contact && contact.unit) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("لطفا نام خود را وارد کنید"),
      designation: Yup.string().required("لطفا نام خود را وارد کنید"),
      tags: Yup.array().required("لطفا برچسب را وارد کنید"),
      status: Yup.array().required("لطفا وضعیت را وارد کنید"),
      unit: Yup.array().required("لطفا وضعیت را وارد کنید"),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "لطفا ایمیل معتبر وارد نمایید"
        )
        .required("لطفا ادرس ایمیل خود را وارد کنید"),
      projects: Yup.string().required("لطفا پروژه خود را وارد کنید"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          status:values.status,
          unit:values.unit,
          email: values.email,
          projects: values.projects,
        };

        // update user
        dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          status: user.status,
          unit: user.unit,
          projects: values["projects"],
        };
        // save new user
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  const ContactsProperties = createSelector(
    (state) => state.contacts,
    (Contacts) => ({
      users: Contacts.users,
      loading: Contacts.loading
    })
  );

  const {
    users, loading
  } = useSelector(ContactsProperties);

  const [isLoading, setLoading] = useState(loading);

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = (arg) => {
    const user = arg;
    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      status: user.status,
      unit: user.unit,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id));
    }
    setContact("");
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setContact("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [
      {
        header: "کد پرسنلی",
        accessorKey: "img",
        cell: (cell) => (
          <>
            {!cell.getValue() ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">{cell.row.original.name.charAt(0)} </span>
              </div>
            ) : (
              <div>
                {/*<img className="rounded-circle avatar-xs" src={cell.getValue()} alt="" />*/}
              </div>
            )}
          </>
        ),
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'نام و نام خانوادگی',
        accessorKey: 'name',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell) => {
          return (
            <>
              <h5 className='font-size-14 mb-1'>
                <Link to='#' className='text-dark'>{cell.getValue()}</Link>
              </h5>
              <p className="text-muted mb-0">{cell.row.original.designation}</p>
            </>
          )
        }
      },
      {
        header: 'ایمیل',
        accessorKey: 'email',
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'کسب و کار',
        accessorKey: 'tags',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell) => {
          return (
            <div>
              {
                cell.getValue()?.map((item, index) => (
                  <Link to="#1" className="badge badge-soft-primary font-size-11 m-1" key={index}>{item}</Link>
                ))
              }
            </div>
          );
        },
      },
      {
        header: 'واحد',
        accessorKey: 'unit',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell) => {
          return (
            <div>
              {
                cell.getValue()?.map((item, index) => (
                  <Link to="#1" className="badge badge-soft-primary font-size-11 m-1" key={index}>{item}</Link>
                ))
              }
            </div>
          );
        },
      },
      {
        header: 'وضعیت همکاری ',
        accessorKey: 'status',
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell) => {
          return (
            <div>
              {
                cell.getValue()?.map((item, index) => (

                  <Link to="#1" className="badge badge-soft-primary font-size-11 m-1" key={index}>{item}</Link>
                ))
              }
            </div>
          );
        },
      },
      {
        header: ' شماره تماس',
        accessorKey: 'projects',
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'اقدامات',
        cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original; onClickDelete(userData);
                }}>
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              </Link>
              <Link
                to="/contacts-profile"
                className="text-primary"

              >
                <i className="mdi mdi-eye font-size-18" id="deletetooltip" />
              </Link>
            </div>
          );
        }
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="لیست پرسنلی" breadcrumbItem=" اطلاعات پرسنلی" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={users || []}
                      isGlobalFilter={true}
                      isPagination={true}
                      SearchPlaceholder="جستجو..."
                      isCustomPageSize={true}
                      isAddButton={true}
                      handleUserClick={handleUserClicks}
                      buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                      buttonName="افزودن همکار جدید"
                      tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                      theadClass="table-light"
                      paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                      pagination="pagination"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {" "}
              {!!isEdit ? "ویرایش همکار" : "افزودن همکار"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col xs={12}>
                    <div className="mb-3">
                      <Label>نام</Label>
                      <Input
                        name="name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>ایمیل</Label>
                      <Input
                        name="email"
                        label="ایمیل"
                        type="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {" "}
                          {validation.errors.email}{" "}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>کسب و کار</Label>
                      <Input
                        type="select"
                        name="tags"
                        className="form-select"
                        multiple={true}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.tags || []}
                        invalid={
                          validation.touched.tags && validation.errors.tags
                            ? true
                            : false
                        }
                      >
                        <option>تپسل</option>
                        <option>فانتوری</option>
                        <option>متریکس</option>
                        <option>مدیاهاوس</option>
                        <option>متیس</option>
                        <option>آیژن</option>
                        <option>آتنا</option>
                        <option>گپیفای</option>
                        <option>دلفین</option>
                      </Input>
                      {validation.touched.tags && validation.errors.tags ? (
                        <FormFeedback type="invalid">
                          {" "}
                          {validation.errors.tags}{" "}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>وضعیت همکاری</Label>
                      <Input
                        type="select"
                        name="status"
                        className="form-select"
                        multiple={true}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.status || []}
                        invalid={
                          validation.touched.status && validation.errors.status
                            ? true
                            : false
                        }
                      >
                        <option>درحال همکاری</option>
                        <option>پایان همکاری</option>
                      </Input>
                      {validation.touched.status && validation.errors.status ? (
                        <FormFeedback type="invalid">
                          {" "}
                          {validation.errors.status}{" "}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>واحد</Label>
                      <Input
                        type="select"
                        name="unit"
                        className="form-select"
                        multiple={true}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.unit || []}
                        invalid={
                          validation.touched.unit && validation.errors.unit
                            ? true
                            : false
                        }
                      >
                        <option>فنی </option>
                        <option>موفقیت مشتری </option>
                        <option>مارکتینگ </option>
                        <option>فروش </option>
                        <option>پشتیبانی </option>
                        <option>استودیو </option>
                        <option>محصول </option>
                        <option>مالی </option>
                        <option>منابع انسانی </option>
                        <option>زیرساخت و it </option>
                      </Input>
                      {validation.touched.unit && validation.errors.unit ? (
                        <FormFeedback type="invalid">
                          {" "}
                          {validation.errors.unit}{" "}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>پروژه ها</Label>
                      <Input
                        name="projects"
                        label="پروژه ها"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.projects || ""}
                        invalid={
                          validation.touched.projects &&
                            validation.errors.projects
                            ? true
                            : false
                        }
                      />
                      {validation.touched.projects &&
                        validation.errors.projects ? (
                        <FormFeedback type="invalid">
                          {" "}
                          {validation.errors.projects}{" "}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>سمت شغلی</Label>
                      <Input
                        type="select"
                        name="designation"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.designation || ""}
                        invalid={
                          validation.touched.designation &&
                            validation.errors.designation
                            ? true
                            : false
                        }
                      >
                        <option>برنامه نویس فرانت</option>
                        <option>طراح UI/UX</option>
                        <option>برنامه نویس بکند</option>
                        <option>برنامه نویس فول استک</option>
                      </Input>
                      {validation.touched.designation &&
                        validation.errors.designation ? (
                        <FormFeedback type="invalid">
                          {" "}
                          {validation.errors.designation}{" "}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button
                        type="submit"
                        color="success"
                        className="save-user"
                      >
                        {" "}
                        {!!isEdit ? "ویرایش" : "افزودن"}{" "}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(ContactsList);
