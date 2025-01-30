import BreadCrumb from '../../components/Common/BreadCrumb';
import React from 'react';
import { Container } from 'react-bootstrap';
import withRouter from "../../components/Common/withRouter";


const addteam = (props) => {
    document.title = "Index | Skote - قالب مدیریتی و داشبورد react" // or "Index | Skote - قالب مدیریتی و داشبورد Vite React "
    return (
        <div className="page-content">
            <React.Fragment>
                <Container fluid>
                    <BreadCrumb title="Index" breadcrumbItem="Index Page"/>
                        <>
                            // write the code here...
                        </>
                  </Container>
            </React.Fragment>
        </div>
    )
}

export default withRouter(addteam);