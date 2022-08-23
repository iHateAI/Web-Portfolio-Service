import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import * as Api from "../../testApi";

function EducationAddForm({
  portfolioOwnerId,
  setEducations,
  setAddEducation,
}) {
  //학교 이름, 전공, 학력 상태 세팅
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    // "education/add" end-point로 post요청
    await Api.post("education/add", {
      user_id,
      school,
      major,
      position,
    });
    // "educationlist/유저id"  get요청
    const res = await Api.get("educationlist", user_id);
    // educations를 response의 data로 세팅함.
    setEducations(res.data);
    // 데이터 추가가 끝나면 종료
    setAddEducation(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Check
        className="mt-3"
        inline
        type="radio"
        name="position"
        label="재학중"
        value="재학중"
        checked={position === "재학중"}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        type="radio"
        name="position"
        label="학사졸업"
        value="학사졸업"
        checked={position === "학사졸업"}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        type="radio"
        name="position"
        label="석사졸업"
        value="석사졸업"
        checked={position === "석사졸업"}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        type="radio"
        name="position"
        label="박사졸업"
        value="박사졸업"
        checked={position === "박사졸업"}
        onChange={(e) => setPosition(e.target.value)}
      />

      <Form.Group className="mt-3 text-center mb-3">
        <Col>
          <Button variant="primary" type="submit" className="me-4">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setAddEducation(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
