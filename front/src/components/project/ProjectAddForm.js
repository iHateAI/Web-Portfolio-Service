import React from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import { useForm } from '../../hooks/useForm';

function ProjectAddForm({ onClick, getUser }) {
    const [values, isValid, handleChange] = useForm({
        title: '',
        detail: '',
        startDate: '',
        endDate: '',
    });

    const handlePutProject = async () => {
        console.log(isValid);
        if (isValid.all) {
            await Api.post('api/project', { ...values });
            getUser();
            onClick();
        }
    };

    return (
        <Form className="mt-3 mb-3 w-100">
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="프로젝트 제목"
                    name="title"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    name="detail"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Row>
                    <Col>
                        <Form.Control
                            type="date"
                            name="startDate"
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="date"
                            name="endDate"
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
                <Button
                    variant="primary"
                    className="me-3"
                    onClick={handlePutProject}
                    disabled={!isValid.all}
                >
                    확인
                </Button>
                <Button variant="secondary" onClick={onClick}>
                    취소
                </Button>
            </Form.Group>
        </Form>
    );
}

export default ProjectAddForm;
