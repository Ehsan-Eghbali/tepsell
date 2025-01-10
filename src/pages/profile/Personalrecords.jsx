import React, { useState, useEffect } from "react";

import {
    Row,
    Col,
    Card,
    Form,
    CardBody,
    CardTitle,
    CardSubtitle,
    Container,
    TabPane,
} from "reactstrap"
import Dropzone from "react-dropzone"

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { Link } from "react-router-dom"




const Personalrecords = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setSelectedFiles(files)
    }

    /**
 * Formats the size
 */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        function formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return "0 Bytes";
            const dm = decimals < 0 ? 0 : decimals;
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
        }
    }

    return (
        <div>
            {useEffect(() => {
            }, [])}

            <TabPane tabId="6" id="Personalrecords">
                <div className="page-content">
                    <Container fluid={true}>

                        <Row>
                            <Col className="col-12">
                                <Card>
                                    <CardBody>
                                        <CardTitle>آپلود مدارک پرسنلی</CardTitle>
                                        <CardSubtitle className="mb-3">
                                            {" "}
                                            فایل را از سیستم وارد و یا به داخل مربع کشیده و رها
                                        </CardSubtitle>
                                        <Form>
                                            <Dropzone
                                                onDrop={(acceptedFiles) => {
                                                    handleAcceptedFiles(acceptedFiles);
                                                }}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div className="dropzone">
                                                        <div
                                                            className="dz-message needsclick mt-2"
                                                            {...getRootProps()}
                                                        >
                                                            <input {...getInputProps()} />
                                                            <div className="mb-3">
                                                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                            </div>
                                                            <h4>
                                                                فایل ها را اینجا رها کنید یا برای آپلود کلیک کنید
                                                            </h4>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <div className="dropzone-previews mt-3" id="file-previews">
                                                {selectedFiles.map((f, i) => {
                                                    return (
                                                        <Card
                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                            key={i + "-file"}
                                                        >
                                                            <div className="p-2">
                                                                <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                            data-dz-thumbnail=""
                                                                            height="80"
                                                                            className="avatar-sm rounded bg-light"
                                                                            alt={f.name}
                                                                            src={f.preview}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                            to="#"
                                                                            className="text-muted font-weight-bold"
                                                                        >
                                                                            {f.name}
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                            <strong>{f.formattedSize}</strong>
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    );
                                                })}
                                            </div>
                                        </Form>

                                        <div className="text-center mt-4">
                                            <button type="button" className="btn btn-primary ">
                                                ارسال فایل
                                            </button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </TabPane>
        </div>
    )
}
export default Personalrecords;