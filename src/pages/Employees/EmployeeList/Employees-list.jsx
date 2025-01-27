import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner"
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    FormFeedback,
    Input,
    Form,
    Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

//redux


import {
    getUsers as onGetUsers,
    addNewUser as onAddNewUser,
    updateUser as onUpdateUser,
    deleteUser as onDeleteUser, getOptionsRequest,
} from "/src/store/employee/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

// const EmployeesList = () => {
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         // درخواست گرفتن لیست teams و units
//         dispatch(getOptionsRequest());
//     }, [dispatch]);
//
//     // گرفتن داده از ریداکس
//     const { options, loading } = useSelector((state) => state.contacts);
//
//     // options.teams و options.units اینجا قابل‌دسترسی است
//     console.log("teams => ", options?.teams);
//     console.log("units => ", options?.units);
//
//     /* ... بقیه کدهای کامپوننت ... */
//
//     return (
//         <>
//             {/* ... */}
//         </>
//     );
// };

const EmployeesList = () => {
    document.title = "لیست پرسنل ";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [contact, setContact] = useState();
    const { options } = useSelector((state) => state.contacts);

    // validation
    useEffect(() => {
        // درخواست گرفتن لیست teams و units
        dispatch(getOptionsRequest());
    }, [dispatch]);
    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            name: (contact && contact.name) || "",
            lastname: (contact && contact.lastname) || "",
            phonenumber: (contact && contact.phonenumber) || "",
            Personnelcode: (contact && contact.Personnelcode) || "",
            tags: (contact && contact.tags) || "",
            birthday: (contact && contact.birthday) || "",
            status: (contact && contact.status) || "",
            unit: (contact && contact.unit) || "",
            email: (contact && contact.email) || "",
            jobposition: (contact && contact.jobposition) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("لطفا نام را وارد کنید"),
            lastname: Yup.string().required("لطفا نام خانوادگی را وارد کنید"),
            Personnelcode: Yup.number()
                .typeError("کد پرسنلی باید عدد باشد")
                .required("لطفا کد پرسنلی را وارد کنید"),
            phonenumber: Yup.string().required("لطفا شماره تماس را وارد کنید"),
            // birthday: Yup.string().required("لطفا تاریخ تولد را وارد کنید"),
            email: Yup.string()
                .email("ایمیل معتبر نیست")
                .required("لطفا ایمیل را وارد کنید"),
            jobposition: Yup.string().required("لطفا سمت شغلی را وارد کنید"),
        }),
        onSubmit: (values) => {
            console.log("Submit triggered with values => ", values); // لاگ برای تست
            if (isEdit) {
                const updateUser = {
                    id: contact.id,
                    name: values.name,
                    designation: values.designation,
                    tags: values.tags,
                    status: values.status,
                    unit: values.unit,
                    email: values.email,
                    projects: values.projects,
                };

                // update user
                dispatch(onUpdateUser(updateUser));
                validation.resetForm();
                setIsEdit(false);
            } else {
                const newUser = {
                    first_name: values.name,
                    last_name: values.lastname,
                    personnel_code: values.Personnelcode,
                    mobile_phone: values.phonenumber,
                    date_of_birth: values.birthday,    // تاریخ تولد
                    email: values.email,
                    position_chart: values.jobposition,
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
                                {/* <span className="avatar-title rounded-circle">{cell.row.original.name.charAt(0)} </span> */}
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
                header: 'نام ',
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
                header: 'نام خانوادگی',
                accessorKey: 'lastName',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cell) => {
                    return (
                        <>
                            <h5 className='font-size-14 mb-1'>
                                <Link to='#' className='text-dark'>{cell.getValue()}</Link>
                            </h5>
                        </>
                    );
                },
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
                                    <Link to="#1" className="badge badge-soft-primary font-size-11 m-1"
                                        key={index}>{item}</Link>
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
                                    <Link to="#1" className="badge badge-soft-primary font-size-11 m-1"
                                        key={index}>{item}</Link>
                                ))
                            }
                        </div>
                    );
                },
            },
            {
                header: 'تاریخ تولد',
                accessorKey: 'birthDate',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cell) => {
                    const birthDate = cell.getValue();
                    return (
                        <div>
                            {birthDate ? new Date(birthDate).toLocaleDateString('fa-IR') : 'نامشخص'}
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

                                    <Link to="#1" className="badge badge-soft-primary font-size-11 m-1"
                                        key={index}>{item}</Link>
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
                                    const userData = cellProps.row.original;
                                    onClickDelete(userData);
                                }}>
                                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                            </Link>
                            <Link
                                to="/employee/1"
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
        <>
            <div>
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDeleteUser}
                    onCloseClick={() => setDeleteModal(false)}
                />
            </div>

            <div className="page-content">
                <Container fluid>
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
                                            isPagination={true}
                                            isAddButton={true} // فعال کردن دکمه
                                            handleUserClick={handleUserClicks}
                                            buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal custom-add-button"
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
                                            <Label>نام </Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.name || ""}
                                                invalid={
                                                    !!(validation.touched.name && validation.errors.name)
                                                }
                                            />
                                            {validation.touched.name && validation.errors.name ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.name}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label> نام خانوادگی</Label>
                                            <Input
                                                name="lastname"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.lastname || ""}
                                                invalid={
                                                    !!(validation.touched.lastname && validation.errors.lastname)
                                                }
                                            />
                                            {validation.touched.lastname && validation.errors.lastname ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.lastname}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label> شماره تماس </Label>
                                            <Input
                                                name="phonenumber"
                                                type="phone"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.phonenumber || ""}
                                                invalid={
                                                    !!(validation.touched.phonenumber && validation.errors.phonenumber)
                                                }
                                            />
                                            {validation.touched.phonenumber && validation.errors.phonenumber ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.phonenumber}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label> شماره پرسنلی </Label>
                                            <Input
                                                name="Personnelcode"
                                                type="number"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.Personnelcode || ""}
                                                invalid={
                                                    !!(validation.touched.Personnelcode && validation.errors.Personnelcode)
                                                }
                                            />
                                            {validation.touched.Personnelcode && validation.errors.Personnelcode ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.Personnelcode}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
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
                                                value={validation.values.birthday}
                                                style={{ height: "38px", width: "100%" }}
                                            />
                                            {validation.errors.birthday && validation.touched.birthday ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.birthday}
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
                                                    !!(validation.touched.email && validation.errors.email)
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
                                            <Label>تیم (Team)</Label>
                                            <select
                                                name="team"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.team || ""}  // مقدار پیش‌فرض در formik
                                            >
                                                <option value="">انتخاب کنید</option>
                                                {options.teams && options.teams.map((team) => (
                                                    <option key={team.ID} value={team.ID}>
                                                        {team.Name}
                                                    </option>
                                                ))}
                                            </select>
                                            {validation.touched.tags && validation.errors.tags ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.tags}
                                                </FormFeedback>
                                            ) : null}
                                        </div>


                                        <div className="mb-3">
                                            <Label>وضعیت همکاری</Label>
                                            <select
                                                name="employement_status"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                multiple={false}
                                                value={validation.values.status || ""}
                                                invalid={validation.touched.status && validation.errors.status ? true : undefined}
                                            >
                                                <option value="">انتخاب کنید</option>
                                                {options.employmentStatuses && options.employmentStatuses.map((employmentStatus) => (
                                                    <option key={employmentStatus.id} value={employmentStatus.id}>
                                                        {employmentStatus.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {validation.touched.status && validation.errors.status ? (
                                                <FormFeedback type="invalid">
                                                    {" "}
                                                    {validation.errors.status}{" "}
                                                </FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>واحد (Unit)</Label>
                                            <select
                                                name="unit"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.unit || ""}
                                            >
                                                <option value="">انتخاب کنید</option>
                                                {options.units && options.units.map((unit) => (
                                                    <option key={unit.ID} value={unit.ID}>
                                                        {unit.Name}
                                                    </option>
                                                ))}
                                            </select>

                                            {validation.touched.unit && validation.errors.unit ? (
                                                <FormFeedback type="invalid">
                                                    {" "}
                                                    {validation.errors.unit}{" "}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label>سمت شغلی</Label>
                                            <Input
                                                type="text"
                                                name="jobposition"
                                                className="form-control"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.jobposition || ""}
                                                invalid={
                                                    !!(validation.touched.jobposition && validation.errors.jobposition)
                                                }
                                            />
                                            {validation.touched.jobposition && validation.errors.jobposition ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.jobposition}
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
        </>
    );
};

export default withRouter(EmployeesList);
