import React, { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import DatePicker from "react-datepicker"
// import * as Api from "../../api";
// import * as Db from "./db";
import TestData from "../../dev/testData"

function CertificateEditForm({
    currentCertificate,
    setCertificates,
    setIsEditing,
}) {
    const [title, setTitle] = useState(currentCertificate.title)
    const [description, setDescription] = useState(
        currentCertificate.description
    )
    const [certificateDate, setCertificateDate] = useState(
        new Date(currentCertificate.certificateDate)
    )

    const formatDate = (date) => {
        const yyyy = date.getFullYear()
        const mm = date.getMonth() + 1
        const dd = date.getDate()

        return yyyy + "-" + mm + "-" + dd
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user_id = currentCertificate.user_id

        // await Api.put(`certificates/${currentCertificate.id}`, {
        //     user_id,
        //     title,
        //     description
        // });

        // const res = await Api.get("certificates", user_id);

        // put test
        // const res = Db.put(currentCertificate.id, {
        //     user_id,
        //     id: 1,
        //     title,
        //     description,
        //     certificateDate: formatDate(certificateDate)
        // })

        const res = await TestData.updateCertificate(TestData.userId, {
            user_id,
            id: currentCertificate.id,
            title,
            description,
            certificateDate: formatDate(certificateDate),
        })

        // setCertificates(res.data);
        setCertificates(res)

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
            <Form.Group controlId="certificateEditDescripiton" className="mt-3">
                <Form.Control
                    type="text"
                    value={description}
                    placeholder="상세내역"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group
                as={Row}
                controlId="certificateEditDate"
                className="mt-3"
            >
                <Col xs="auto">
                    <DatePicker
                        selected={certificateDate}
                        onChange={(date) => setCertificateDate(date)}
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
