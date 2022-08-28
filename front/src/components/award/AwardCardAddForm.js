import React from 'react';
import useModal from '../../hooks/useModal';

import { Form, Row, Col, Button } from 'react-bootstrap';
import AlertModal from '../modal/AlertModal';
import { useForm } from '../../hooks/useForm';

const AwardCardAddForm = ({
    onAddSubmitEvent,
    onAddCancelButtonClickEvent,
}) => {
    const [values, isValid, handleChange] = useForm({ title: '', detail: '' });

    const [
        isShow,
        onShowButtonClickEventHandler,
        onCloseButtonClickEventHandler,
    ] = useModal(false);

    const onAddSubmitEventHandler = (e) => {
        e.preventDefault();
        if (!isValid.all) {
            onShowButtonClickEventHandler();
            return;
        }
        const awardObj = { ...values };
        onAddSubmitEvent(awardObj);
    };

    const onAddCancelButtonClickEventHandler = () => {
        onAddCancelButtonClickEvent(false);
    };

    return (
        <React.Fragment>
            <Form onSubmit={onAddSubmitEventHandler}>
                <Form.Group controlId="formAddAwardTitle">
                    <Form.Control
                        type="text"
                        placeholder="수상내역"
                        name="title"
                        onChange={handleChange}
                    />
                    {!isValid.title && (
                        <Form.Text className="text-danger">
                            수상내역이 올바르지 않습니다.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlId="formAddAwardDetail">
                    <Form.Control
                        type="text"
                        placeholder="수상내역 설명"
                        name="detail"
                        onChange={handleChange}
                    />
                    {!isValid.detail && (
                        <Form.Text className="text-danger">
                            수상내역 설명이 올바르지 않습니다.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={colStyle}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="me-3"
                        >
                            확인
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={onAddCancelButtonClickEventHandler}
                        >
                            취소
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
            <AlertModal
                msg="입력이 올바르지 않습니다."
                isShow={isShow}
                onCloseButtonClickEvent={onCloseButtonClickEventHandler}
            />
        </React.Fragment>
    );
};

const colStyle = {
    span: 20,
};

export default AwardCardAddForm;
