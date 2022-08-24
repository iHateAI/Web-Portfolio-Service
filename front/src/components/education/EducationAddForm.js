import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
// import * as Api from "../../testApi";
import * as Api from "../../api";
import useModal from "../../hooks/useModal";
import useEducationValidation from "../../hooks/useEducationValidation";
import AlertModal from "../modal/AlertModal";

function EducationAddForm({
  portfolioOwnerId,
  setEducations,
  setAddEducation,
}) {
  //학교 이름, 전공, 학력 상태 세팅
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");

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
  } = useEducationValidation();

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
    const userId = portfolioOwnerId;
    if (!isValid) {
      onShowButtonClickEventHandler();
      return;
    }

    // "education/add" end-point로 post요청
    await Api.post("api/education", {
      university,
      major,
      status,
    });

    // "educationlist/유저id"  get요청
    const res = await Api.get(`api/education/`);
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
        <Col>
          <Button variant="primary" type="submit" className="me-4">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setAddEducation(false)}>
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

export default EducationAddForm;
