import React from "react";
import useModal from "../../hooks/useModal";
import { Form, Row, Col, Button } from "react-bootstrap";
import AlertModal from "../modal/AlertModal";
import { useForm } from "../../hooks/useForm";

const AwardCardEdit = ({
  award,
  onAwardEditButtonClickEvent,
  onCancelButtonClickEvent,
}) => {
  const [values, isValid, handleChange] = useForm({ ...award });

  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();
    if (!isValid.all) {
      onShowButtonClickEventHandler();
      return;
    }
    const editedAward = {
      ...values,
    };
    onAwardEditButtonClickEvent(editedAward);
  };

  const handleCancelButtonClick = () => {
    onCancelButtonClickEvent(false);
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmitButtonClick}>
        <Form.Group controlled="formAwardTitle">
          <Form.Control
            type="text"
            placeholder="수상내역"
            value={values?.title}
            name="title"
            onChange={handleChange}
          />
          {!isValid.title && (
            <Form.Text className="text-danger">
              수상내역이 올바르지 않습니다.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlled="formAwardDetail">
          <Form.Control
            type="text"
            placeholder="수상내역 설명"
            value={values?.detail}
            name="detail"
            onChange={handleChange}
          />
          {!isValid.detail && (
            <Form.Text className="text-danger">
              수상내역 설명이 올바르지 않습니다.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group as={Row} className="mt-5 text-center mb-5">
          <Col sm={colStyle}>
            <Button variant="primary" type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={handleCancelButtonClick}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <AlertModal
        msg="편집 입력이 올바르지 않습니다."
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
      />
    </React.Fragment>
  );
};

const colStyle = {
  span: 20,
};

export default AwardCardEdit;
