import React, { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import DatePicker from "react-datepicker"
import * as Api from "../../api";
// import * as Db from "./db";
// import TestData from "../../dev/testData"

function CertificateAddForm({
    portfolioOwnerId,
    setCertificates,
    setIsAdding,
}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [certificateDate, setCertificateDate] = useState(new Date())

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = ("0" + (date.getMonth() + 1)).slice(-2);
        const dd = ("0" + date.getDate()).slice(-2);

        return yyyy + '-' + mm + '-' + dd
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user_id = portfolioOwnerId;

        await Api.post("api/certification", {
            title,
            detail: description,
            certificationDate: formatDate(certificateDate)
        });

        const res = await Api.get("api/certification");

        // post test
        // const res = Db.post(1, {
        //     title,
        //     description,
        //     certificateDate: formatDate(certificateDate)
        // })
        // const res = await TestData.createCertificate(TestData.userId, {
        //     user_id: TestData.userId,
        //     id: TestData[TestData.userId].certificates.length + 1,
        //     title,
        //     description,
        //     certificateDate: formatDate(certificateDate),
        // })

        // setCertificates(res)

        setCertificates(res.data)

        setIsAdding(false)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="certificateAddTitle">
                <Form.Control
                    type="text"
                    value={title}
                    placeholder="자격증 제목"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="certificateAddDescripiton" className="mt-3">
                <Form.Control
                    type="text"
                    value={description}
                    placeholder="상세내역"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group
                as={Row}
                controlId="certificateAddDate"
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
                        onClick={() => setIsAdding(false)}
                    >
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default CertificateAddForm
