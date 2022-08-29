import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useForm } from "../../hooks/useForm";

function CertificateEditForm({
  currentCertificate,
  setCertificates,
  setIsEditing,
}) {
  const [values, isValid, handleChange] = useForm({
    ...currentCertificate,
  });

  const { title, detail, certificationDate } = values || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid.all) return;
    const user_id = currentCertificate.user_id;
    await Api.put(`api/certification/${currentCertificate._id}`, {
      ...values,
    });
    const res = await Api.get("api/certification");
    setCertificates(res.data.data);
    setIsEditing(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateEditTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={title}
          name="title"
          onChange={handleChange}
        />
        {!isValid.title && (
          <Form.Text className="text-danger">5글자 이상 적어주세요</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="certificateEditDetail" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={detail}
          name="detail"
          onChange={handleChange}
        />
        {!isValid.detail && (
          <Form.Text className="text-danger">5글자 이상 적어주세요</Form.Text>
        )}
      </Form.Group>
      <Form.Group as={Row} controlId="certificateEditDate" className="mt-3">
        <Col xs="auto">
          <Form.Control
            type="date"
            name="certificationDate"
            value={certificationDate}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;
