import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
// import * as Api from "../../testApi";
import * as Api from "../../api";
import useModal from "../../hooks/useModal";
import useAwardValidation from "../../hooks/useAwardValidation";
import AlertModal from "../modal/AlertModal";

function EducationEditForm({ setIsEditing, setEducations, education }) {
  //학교 이름, 전공, 졸업 정보 상태 세팅
  const [university, setUniversity] = useState(education.university);
  const [major, setMajor] = useState(education.major);
  const [status, setStatus] = useState(education.status);

  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  const {
    checkValidationUniversity,
    checkValidationMajor,
    checkValidationStatus,
    checkValidationEducationAll,
  } = useAwardValidation();

  const isValidUniversity = checkValidationUniversity(university);
  const isValidMajor = checkValidationMajor(major);
  const isValidStatus = checkValidationStatus(status);
  const isValid = checkValidationEducationAll(
    isValidUniversity,
    isValidMajor,
    isValidStatus
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      onShowButtonClickEventHandler();
      return;
    }

    // "educations/education id" end-point로 PUT 요청
    await Api.put(`api/education/${education._id}`, {
      university,
      major,
      status,
    });
    // "educationlist/유저id" end-point로 GET 요청

    const res = await Api.get("api/education");
    // educations를 response -> data로 세팅
    setEducations(res.data);

    // Edit 모드 종료, Edit모드를 false로
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
        {!isValidUniversity && (
          <Form.Text className="text-danger">
            학교 이름을 4글자 이상 기입해주세요.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        {!isValidMajor && (
          <Form.Text className="text-danger">
            전공을 4글자 이상 기입해주세요.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Check
        className="mt-3"
        inline
        type="radio"
        name="status"
        label="재학중"
        value="재학중"
        checked={status === "재학중"}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="학사졸업"
        value="학사졸업"
        checked={status === "학사졸업"}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="석사졸업"
        value="석사졸업"
        checked={status === "석사졸업"}
        onChange={(e) => setStatus(e.target.value)}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="박사졸업"
        value="박사졸업"
        checked={status === "박사졸업"}
        onChange={(e) => setStatus(e.target.value)}
      />
      {!isValidStatus && (
        <Form.Text className="text-danger">학력을 선택해주세요.</Form.Text>
      )}

      <Form.Group className="mt-3 text-center mb-3">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
      <AlertModal
        msg="입력이 올바르지 않습니다."
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
      />
    </Form>
  );
}

export default EducationEditForm;
