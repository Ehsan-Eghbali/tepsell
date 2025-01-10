import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";


//i18n
import { withTranslation } from "react-i18next";

const Header = (props) => {
  const [menu, setMenu] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [socialDrp, setsocialDrp] = useState(false);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src="" alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src="" alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src="" alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src="" alt="" height="19" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu);
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="جستجو..."
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>

            <Dropdown
              className="dropdown-mega d-none d-lg-block ms-2"
              isOpen={menu}
              toggle={() => setMenu(!menu)}
            >
              <DropdownToggle className="btn header-item " caret tag="button">
                {props.t("Mega Menu")} <i className="mdi mdi-chevron-down" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-megamenu">
                <Row>
                  <Col sm={8}>
                    <Row>
                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("  اجزای رابط کاربری")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{props.t("جعبه روشن")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("اسلایدر لغزنده")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("هشدار شیرین")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("رتبه بندی")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("فرم ها")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("جدول ها")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("نمودار ها")}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("برنامه های کاربردی")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{props.t("تجارت الکترونیک")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("تقویم")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("ایمیل")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("پروژه ها")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("وظایف")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("مخاطبان")}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("صفحات اضافی")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{props.t("نوار کناری نور")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("نوار کناری فشرده")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("طرح افقی")}</Link>
                          </li>
                          <li>
                            <Link to="#"> {props.t("نگهداری")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("به زودی")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("خط زمانی")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("سوالات متداول")}</Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}>
                    <Row>
                      <Col sm={6}>
                        <h5 className="font-size-14 mt-0">
                          {props.t("اجزای رابط کاربری")}
                        </h5>
                        <ul className="list-unstyled megamenu-list">
                          <li>
                            <Link to="#">{props.t("جعبه روشن")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("اسلایدر لغزنده")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("هشدار شیرین")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("رتبه بندی")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("فرم ها")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("جدول ها")}</Link>
                          </li>
                          <li>
                            <Link to="#">{props.t("نمودار ها")}</Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
                onClick={() => setSearch(!isSearch)}
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  isSearch
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={props.t("جستجو") + "..."}
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>


            <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
             
            </Dropdown>

            <NotificationDropdown />

            <ProfileMenu />

        
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header));
