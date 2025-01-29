import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner"
import { Card,CardBody,Col,Container,Row,Modal,ModalHeader,ModalBody,Label,FormFeedback,Input,Form,Button,} from "reactstrap";
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
    useEffect(() => {
        dispatch(onGetUsers());
    }, [dispatch]);
    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            name: "",
            lastname: "",
            phonenumber: "",
            Personnelcode: "",
            birthday: "",
            email: "",
            position_chart: "",
            team_id: "",
            unit_id: "",
            employment_status_id: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("نام لازم است"),
            lastname: Yup.string().required("نام خانوادگی لازم است"),
            Personnelcode: Yup.number().required("کد پرسنلی لازم است"),
            phonenumber: Yup.string().required("شماره موبایل لازم است"),
            birthday: Yup.string().required("تاریخ تولد لازم است"),
            email: Yup.string().required("ایمیل لازم است"),
            position_chart: Yup.string(),
            team_id: Yup.number(),
            unit_id: Yup.number(),
            employment_status_id: Yup.number(),
        }),
        onSubmit: (values) => {
            console.log(values);
            if (isEdit) {
                const updateUser = {
                    id: contact.id,
                    name: values.name,
                    designation: values.designation,
                    tags: values.tags,
                    status: values.status,
                    unit: values.unit_id,
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
                    personnel_code: parseInt(values.Personnelcode, 10),
                    mobile_phone: values.phonenumber,
                    date_of_birth: values.birthday,
                    email: values.email,
                    position_chart: values.position_chart,
                    team_id: values.team_id ? parseInt(values.team_id, 10) : null,
                    unit_id: values.unit_id ? parseInt(values.unit_id, 10) : null,
                    employment_status_id: values.employment_status_id
                        ? parseInt(values.employment_status_id, 10)
                        : null,
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
                accessorKey: "personnel_code",
                cell: (cell) => {
                    return (
                        <>
                            <h5 className='font-size-14 mb-1'>
                                <Link to='#' className='text-dark'>{cell.getValue()}</Link>
                            </h5>
                            <p className="text-muted mb-0">{cell.row.original.designation}</p>
                        </>
                    )
                },
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'نام ',
                accessorKey: 'first_name',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cell) => {
                    return (
                        <>
                            <h5 className='font-size-14 mb-1'>
                                <Link to='#' className='text-dark'>{cell.getValue()}</Link>
                            </h5>
                        </>
                    )
                }
            },
            {
                header: 'نام خانوادگی',
                accessorKey: 'last_name',
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
                    const value = cell.getValue();
                    return (
                        <div>
                            {Array.isArray(value) ? value.map((item, index) => (
                                <Link to="#1" className="badge badge-soft-primary font-size-11 m-1"
                                    key={index}>{item}</Link>
                            )) : null}
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
                accessorKey: 'employment_status',
                enableColumnFilter: false,
                enableSorting: false,
                cell: (cell) => {
                    const value = cell.getValue();
                    return (
                        <div>
                            {Array.isArray(value) ? value.map((item, index) => (
                                <Link to="#1" className="badge badge-soft-primary font-size-11 m-1"
                                    key={index}>{item}</Link>
                            )) : null}
                        </div>
                    );
                },
            },
            {
                header: ' شماره تماس',
                accessorKey: 'mobile_phone',
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
                                                id="formrow-birthday"
                                                value={validation.values.birthday}
                                                onChange={(value) => {
                                                    // value ممکن است یک DateObject یا آرایه باشد
                                                    // بسته به این که چندتایی انتخاب می‌کنید یا نه
                                                    if (!value) {
                                                        validation.setFieldValue("birthday", "");
                                                    } else {
                                                        // فرمت میلادی یا شمسی که می‌خواهید در state باشد
                                                        validation.setFieldValue("birthday", value.format("YYYY-MM-DD"));
                                                    }
                                                }}
                                                className={`form-control ${
                                                    validation.touched.birthday && validation.errors.birthday ? "is-invalid" : ""
                                                }`}
                                                style={{ height: "38px", width: "100%" }}
                                            />
                                            {validation.errors.birthday && validation.touched.birthday && (
                                                <FormFeedback type="invalid">{validation.errors.birthday}</FormFeedback>
                                            )}
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
                                                name="team_id" // هم‌نام با schema
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.team_id || ""}
                                            >
                                                <option value="">انتخاب کنید</option>
                                                {options.teams && options.teams.map((team) => (
                                                    <option key={team.ID} value={team.ID}>
                                                        {team.Name}
                                                    </option>
                                                ))}
                                            </select>
                                            {validation.errors.team_id && validation.touched.team_id && (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.team_id}
                                                </FormFeedback>
                                            )}
                                        </div>


                                        <div className="mb-3">
                                            <Label>وضعیت همکاری</Label>
                                            <select
                                                name="employment_status_id"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.employment_status_id || ""}
                                            >
                                                <option value="">انتخاب کنید</option>
                                                {options.employmentStatuses && options.employmentStatuses.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {validation.errors.employment_status_id && validation.touched.employment_status_id && (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.employment_status_id}
                                                </FormFeedback>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <Label>واحد (Unit)</Label>
                                            <select
                                                name="unit_id"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.unit_id || ""}
                                            >
                                                <option value="">انتخاب کنید</option>
                                                {options.units && options.units.map((unit) => (
                                                    <option key={unit.ID} value={unit.ID}>
                                                        {unit.Name}
                                                    </option>
                                                ))}
                                            </select>
                                            {validation.errors.unit_id && validation.touched.unit_id && (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.unit_id}
                                                </FormFeedback>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <Label>سمت شغلی</Label>
                                            <Input
                                                type="text"
                                                name="position_chart"
                                                className="form-control"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.position_chart || ""}
                                            />
                                            {validation.touched.position_chart && validation.errors.position_chart ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.position_chart}
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
