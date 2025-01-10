import React, { useState } from "react";
import PropTypes from "prop-types";
import ProfileCard from "./profilecard";
import Personalinfo from "./Personalinfo";
import ProfileTab from "./ProfileTab";


import {
  Card, Col, Container, Row, CardBody, CardTitle, Label, Form, Input, FormFeedback, Nav,
  NavItem,
  Button,
  NavLink, TabContent, TabPane, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
import classnames from "classnames";


//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "../../components/Common/withRouter";
import * as Yup from 'yup';
import { useFormik } from "formik";

import "moment/locale/fa"; // Persian locale
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

// import images


const Profile = ({ removeBodyCss, props }) => {
  //meta title
  document.title =
    "صفحه همکاران ";

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
    validationSchema: Yup.object({
      firstname: Yup.string().required("این فیلد اجباری است"),
      email: Yup.string()
        .email()
        .matches(/^(?!.*@[^,]*,)/)
        .required("ایمیل خود را وارد کنید"),
      password: Yup.string()
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .matches(RegExp("(.*[a-z].*)"), "حداقل حروف کوچک")
        .matches(RegExp("(.*[A-Z].*)"), "حداقل حروف بزرگ")
        .matches(RegExp("(.*[0-9].*)"), "حداقل  عدد")
        .required("This field is required"),
      city: Yup.string().required("این فیلد الزامی است"),
      state: Yup.string().required("این فیلد الزامی است"),
      zip: Yup.string().required("این فیلد الزامی است"),
      check: Yup.string().required("این فیلد الزامی است"),
    }),

    onSubmit: (values) => {
      // console.log("value", values.password);
    },
  });

  const [activeTab, setActiveTab] = useState("1");
  const [isMenu, setIsMenu] = useState(false);
  const [modal_standard, setModal_standard] = useState(false);

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  const tog_standard = () => {
    setModal_standard(!modal_standard);
    removeBodyCss();
  }

  const [formRows, setFormRows] = useState([
    { id: 1, name: "", email: "", subject: "", resume: "", message: "" }
  ]);

  const onAddFormRow = () => {
    const newRow = { id: Math.floor(Math.random() * (30 - 20)) + 20, name: "", email: "", subject: "", resume: "", message: "" };
    setFormRows([...formRows, newRow]);
  };

  return (
    <React.Fragment>

      <div className="account-pages my-5 pt-sm-5">
        <Container >
          <div>
            <div className="profile-card">
              <ProfileCard />

              <Nav tabs className="nav-tabs-custom" role="tablist">
                <ProfileTab />
              </Nav>
              
            </div>


          </div>

        </Container>

      </div >
    </React.Fragment >
  );
};

Profile.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Profile);
