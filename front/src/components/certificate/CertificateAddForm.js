import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useForm } from "../../hooks/useForm";

function CertificateAddForm({
  portfolioOwnerId,
  setCertificates,
  setIsAdding,
}) {
  const [values, isValid, handleChange] = useForm({
    title: "",
    detail: "",
    certificationDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid.all) return;
    const user_id = portfolioOwnerId;
    await Api.post("api/certification", {
      ...values,
    });

    const res = await Api.get("api/certification");
    setCertificates(res.data.data);
    setIsAdding(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateAddTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          name="title"
          onChange={handleChange}
        />
        {!isValid.title && (
          <Form.Text className="text-danger">5글자 이상 적어주세요</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="certificateAddDetail" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          name="detail"
          onChange={handleChange}
        />
        {!isValid.detail && (
          <Form.Text className="text-danger">5글자 이상 적어주세요</Form.Text>
        )}
      </Form.Group>
      <Form.Group as={Row} controlId="certificateAddDate" className="mt-3">
        <Col xs="auto">
          <Form.Control
            type="date"
            name="certificationDate"
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;
