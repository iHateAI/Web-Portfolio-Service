import React from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import { useForm } from '../../hooks/useForm';

function ProjectEditForm({ project, editClick, getUser }) {
    const [values, isValid, handleChange] = useForm({ ...project });

    const handlePostProject = async () => {
        if (isValid.all) {
            await Api.put(`api/project/${project._id}`, {
                title: values.title,
                detail: values.detail,
                start_date: values.startDate,
                end_date: values.endDate,
            });
            getUser();
            editClick();
        }
    };

    return (
        <Form className="mt-3 mb-3">
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="프로젝트 제목"
                    name="title"
                    value={values?.title}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    name="detail"
                    value={values?.detail}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Row>
                    <Col>
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={values?.startDate}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={values?.endDate}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
                <Button
                    variant="primary"
                    className="me-3"
                    onClick={handlePostProject}
                >
                    확인
                </Button>
                <Button variant="secondary" onClick={editClick}>
                    취소
                </Button>
            </Form.Group>
        </Form>
    );
}

export default ProjectEditForm;
