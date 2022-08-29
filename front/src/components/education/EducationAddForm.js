import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import * as Api from "../../api";
import useModal from "../../hooks/useModal";
import AlertModal from "../modal/AlertModal";
import { useForm } from "../../hooks/useForm";

function EducationAddForm({
  portfolioOwnerId,
  setEducations,
  setAddEducation,
}) {
  //학교 이름, 전공, 학력 상태 세팅
  const [values, isValid, handleChange] = useForm({
    university: "",
    major: "",
    status: "",
  });

  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = portfolioOwnerId;
    if (!isValid.all) {
      onShowButtonClickEventHandler();
      return;
    }

    // "education/add" end-point로 post요청
    await Api.post("api/education", {
      ...values,
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
          name="university"
          onChange={handleChange}
        />
        {!isValid.university && (
          <Form.Text className="text-danger">
            학교 이름을 4글자 이상 입력해주세요.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          name="major"
          onChange={handleChange}
        />
        {!isValid.major && (
          <Form.Text className="text-danger">
            전공을 4글자 이상 입력해주세요.
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
        onChange={handleChange}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="학사졸업"
        value="학사졸업"
        onChange={handleChange}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="석사졸업"
        value="석사졸업"
        onChange={handleChange}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="박사졸업"
        value="박사졸업"
        onChange={handleChange}
      />
      {!isValid.status && (
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
