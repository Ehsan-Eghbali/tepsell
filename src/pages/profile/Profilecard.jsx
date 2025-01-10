import React from "react";
// import ProfileTab from "./ProfileTab";
import { Nav, } from "reactstrap";


//image
import avatar from "../../assets/images/avatar.png"

const profilecard = () => {
    return (
        <React.Fragment>
            <div className="profile-card">
                <div className="profile-card__header">
                    <img src={avatar} alt="Profile" className="profile-card__avatar" />
                    <div className="profile-card__info">
                        <h3>محمد مهدی مهربان نیا</h3>
                        <span>کارشناس منابع انسانی</span>
                    </div>
                </div>

                <div className="profile-card__details">
                    <div className="contact-details">
                        <p><i className="fas fa-envelope"></i> h.izadi@tapsell.ir</p>
                        <p><i className=" fab fa-telegram "></i> @hri833</p>
                        <p><i className="fab fa-twitter"></i> TwitterChristian Bale</p>
                    </div>
                    <div className="statistics">
                        <div>
                            <h4>10 ماه</h4>
                            <span>مدت زمان همکاری</span>
                        </div>
                        <div>
                            <h4>فعال</h4>
                            <span>وضعیت همکاری</span>
                        </div>
                    </div>
                </div>
                {/* <Nav tabs className="nav-tabs-custom" role="tablist">
                    <ProfileTab />
                </Nav> */}
            </div>

        </React.Fragment>
    );
}
export default profilecard;