import React, { useState } from 'react';
import { Col } from 'reactstrap';

import "flatpickr/dist/themes/material_blue.css";
import FlatPickr from "react-flatpickr";

const JobListGlobalFilter = ({ setGlobalFilter }) => {
    const [selectDate, setSelectDate] = useState();
    const dateChange = (date) => {
        setSelectDate(date)
    };

    const handleSelectStatus = (ele) => {
        const selectedValue = ele.value;
        setGlobalFilter(selectedValue === 'all' ? '' : selectedValue);
    }
    return (
        <React.Fragment>
            <Col xxl={2} lg={6}>
                <select className="form-control select2 mb-3 mb-xxl-0" defaultValue="Status" onChange={(e) => handleSelectStatus(e.target)}>
                    <option disabled>وضعیت</option>
                    <option value="all">همه</option>
                    <option value="Active">فعال</option>
                    <option value="New">جدید</option>
                    <option value="Close">بستن</option>
                </select>
            </Col>
            <Col xxl={2} lg={4}>
                <select className="form-control select2 mb-3 mb-xxl-0" defaultValue="Select Type" onChange={(e) => handleSelectStatus(e.target)}>
                    <option disabled>انتخاب نوع</option>
                    <option value="all">همه</option>
                    <option value="Full Time">تمام وقت</option>
                    <option value="Part Time">پاره وقت</option>
                </select>
            </Col>
            <Col xxl={2} lg={4}>
                <div id="datepicker1">
                    <FlatPickr
                        className="form-control mb-3 mb-xxl-0"
                        name="joiningDate"
                        placeholder="انتخاب زمان"
                        options={{
                            dateFormat: "d M,Y"
                        }}
                        selected={selectDate}
                        onChange={dateChange}
                    />
                </div>
            </Col>
            {/* <Col xxl={2} lg={4}>
                <div className='mb-3 mb-xxl-0'>
                    <button type="button" className="btn btn-soft-secondary w-100">
                        <i className="mdi mdi-filter-outline align-middle"></i> Filter</button>
                </div>
            </Col> */}
        </React.Fragment>
    )
};
export default JobListGlobalFilter;

