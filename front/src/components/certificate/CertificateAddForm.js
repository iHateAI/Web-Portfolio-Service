import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";
import useCertificateValidation from "../../hooks/useCertificateValidation";
// import TestData from "../../dev/testData"

function CertificateAddForm({
  portfolioOwnerId,
  setCertificates,
  setIsAdding,
}) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [certificationDate, setCertificationDate] = useState(new Date());
  const { checkValidateCertificateTitle, checkValidateCertificateDetail } =
    useCertificateValidation();

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = ("0" + (date.getMonth() + 1)).slice(-2);
    const dd = ("0" + date.getDate()).slice(-2);

    return yyyy + "-" + mm + "-" + dd;
  };

  const isValidTitle = checkValidateCertificateTitle(title);
  const isValidDetail = checkValidateCertificateDetail(detail);
  const isValidAll = isValidTitle && isValidDetail;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidAll) return;

    const user_id = portfolioOwnerId;

    await Api.post("api/certification", {
      title,
      detail,
      certificationDate: formatDate(certificationDate),
    });

    const res = await Api.get("api/certification");

    // const res = await TestData.createCertificate(TestData.userId, {
    //     user_id: TestData.userId,
    //     id: TestData[TestData.userId].certificates.length + 1,
    //     title,
    //     description,
    //     certificateDate: formatDate(certificateDate),
    // })

    // setCertificates(res)

    setCertificates(res.data);

    setIsAdding(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateAddTitle">
        <Form.Control
          type="text"
          value={title}
          placeholder="자격증 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        {!isValidTitle && <Form.Text muted>2글자 이상 적어주세요</Form.Text>}
      </Form.Group>
      <Form.Group controlId="certificateAddDetail" className="mt-3">
        <Form.Control
          type="text"
          value={detail}
          placeholder="상세내역"
          onChange={(e) => setDetail(e.target.value)}
        />
        {!isValidDetail && <Form.Text muted>2글자 이상 적어주세요</Form.Text>}
      </Form.Group>
      <Form.Group as={Row} controlId="certificateAddDate" className="mt-3">
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
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;
