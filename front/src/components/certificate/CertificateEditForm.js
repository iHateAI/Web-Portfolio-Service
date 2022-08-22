import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user_id = currentCertificate.user_id;

        await Api.put(`certificates/${currentCertificate.id}`, {
            user_id,
            title,
            description
        });

        const res = await Api.get("certificates", user_id);

        setCertificates(res.data);

        setIsEditing(false);
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
            <Form.Group controlId="certificateAddDescripiton">
                <Form.Control
                    type="text"
                    value={description}
                    placeholder="상세내역"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit">확인</Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>취소</Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default CertificateEditForm;