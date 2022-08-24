import React, { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import DatePicker from "react-datepicker"
import * as Api from "../../api";
// import TestData from "../../dev/testData"

function CertificateEditForm({
    currentCertificate,
    setCertificates,
    setIsEditing,
}) {
    const [title, setTitle] = useState(currentCertificate.title)
    const [detail, setDetail] = useState(
        currentCertificate.detail
    )
    const [certificationDate, setCertificationDate] = useState(
        new Date(currentCertificate.certificationDate)
    )

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = ("0" + (date.getMonth() + 1)).slice(-2);
        const dd = ("0" + date.getDate()).slice(-2);

        return yyyy + '-' + mm + '-' + dd
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user_id = currentCertificate.user_id

        await Api.put(`api/certification/${currentCertificate._id}`, {
            title,
            detail,
            certificationDate: formatDate(certificationDate)
        });

        const res = await Api.get("api/certification");

        // const res = await TestData.updateCertificate(TestData.userId, {
        //     user_id,
        //     id: currentCertificate.id,
        //     title,
        //     description,
        //     certificateDate: formatDate(certificateDate),
        // })

        // setCertificates(res)

        setCertificates(res.data);
        
        setIsEditing(false)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="certificateEditTitle">
                <Form.Control
                    type="text"
                    value={title}
                    placeholder="자격증 제목"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="certificateEditDetail" className="mt-3">
                <Form.Control
                    type="text"
                    value={detail}
                    placeholder="상세내역"
                    onChange={(e) => setDetail(e.target.value)}
                />
            </Form.Group>
            <Form.Group
                as={Row}
                controlId="certificateEditDate"
                className="mt-3"
            >
                <Col xs="auto">
                    <DatePicker
                        selected={certificationDate}
                        onChange={(date) => setCertificationDate(date)}
                        dateFormat="yyyy-MM-dd"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center mb-4">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setIsEditing(false)}
                    >
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default CertificateEditForm
