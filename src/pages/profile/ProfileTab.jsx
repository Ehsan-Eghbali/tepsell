import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames"; // اطمینان حاصل کنید که این کتابخانه نصب شده است
import Personalinfo from "./Personalinfo";
import Jobinfo from "./jobinfo";
import Personalrecords from "./Personalrecords";

const ProfileTab = () => {
    const [activeTab, setActiveTab] = useState("1");

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <React.Fragment>
            <Nav>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === "1",
                        })}
                        onClick={() => {
                            toggleTab("1");
                        }}
                    >
                        اطلاعات شخصی
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === "2",
                        })}
                        onClick={() => {
                            toggleTab("2");
                        }}
                    >
                        اطلاعات شغلی
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === "3",
                        })}
                        onClick={() => {
                            toggleTab("3");
                        }}
                    >
                        آموزش ها
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === "4",
                        })}
                        onClick={() => {
                            toggleTab("4");
                        }}
                    >
                        مدیریت عملکرد
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === "5",
                        })}
                        onClick={() => {
                            toggleTab("5");
                        }}
                    >
                        امور قراردادها
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === "6",
                        })}
                        onClick={() => {
                            toggleTab("6");
                        }}
                    >
                        سوابق پرسنلی
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent
                activeTab={activeTab}
                className="crypto-buy-sell-nav-content p-4 col-12">
                <TabPane tabId="1">
                    <Personalinfo />
                </TabPane>
                <TabPane tabId="2">
                    <Jobinfo />
                </TabPane>
                <TabPane tabId="6">
                    <Personalrecords />
                </TabPane>
            </TabContent>
        </React.Fragment >
    );
};

export default ProfileTab;
