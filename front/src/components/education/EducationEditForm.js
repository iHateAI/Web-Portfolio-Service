import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import * as Api from '../../api';
import useModal from '../../hooks/useModal';
import AlertModal from '../modal/AlertModal';
import { useForm } from '../../hooks/useForm';

function EducationEditForm({ setIsEditing, setEducations, education }) {
    const [values, isValid, handleChange] = useForm({
        ...education,
    });

    const [
        isShow,
        onShowButtonClickEventHandler,
        onCloseButtonClickEventHandler,
    ] = useModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid.all) {
            onShowButtonClickEventHandler();
            return;
        }

        // "educations/education id" end-point로 PUT 요청
        await Api.put(`api/education/${education._id}`, {
            ...values,
        });
        // "educationlist/유저id" end-point로 GET 요청

        const res = await Api.get('api/education');
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
                    value={values?.university}
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
                    value={values?.major}
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
                checked={values?.status === '재학중'}
                onChange={handleChange}
            />
            <Form.Check
                inline
                type="radio"
                name="status"
                label="학사졸업"
                value="학사졸업"
                checked={values?.status === '학사졸업'}
                onChange={handleChange}
            />
            <Form.Check
                inline
                type="radio"
                name="status"
                label="석사졸업"
                value="석사졸업"
                checked={values?.status === '석사졸업'}
                onChange={handleChange}
            />
            <Form.Check
                inline
                type="radio"
                name="status"
                label="박사졸업"
                value="박사졸업"
                checked={values?.status === '박사졸업'}
                onChange={handleChange}
            />
            {!isValid.status && (
                <Form.Text className="text-danger">
                    학력을 선택해주세요.
                </Form.Text>
            )}

            <Form.Group className="mt-3 text-center mb-3">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setIsEditing(false)}
                    >
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
