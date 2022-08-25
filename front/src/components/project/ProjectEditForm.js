import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
// import { postProject } from './dev/mockApiProject';
//import TestData from '../../dev/testData';
import * as Api from '../../api';
import useValidation from '../../hooks/useValidation';

function ProjectEditForm({ project, editClick, getUser }) {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.detail);
    const [startDate, setStartDate] = useState(project.startDate);
    const [endDate, setEndDate] = useState(project.endDate);

    const [
        checkValidationTitle,
        checkValidationDescription,
        checkValidationDate,
        checkValidationAll,
    ] = useValidation();

    const isValidTitle = checkValidationTitle(title);
    const isValidDescription = checkValidationDescription(description);
    const isValidDate =
        checkValidationDate(startDate) && checkValidationDate(endDate);
    const isValid = checkValidationAll(
        isValidTitle,
        isValidDescription,
        isValidDate
    );

    const handlePostProject = async () => {
        // await postProject(project.key, { name, description, date });
        // await TestData.updateProject(project.key, { name, description, date });
        if (isValid) {
            await Api.put(`api/project/${project._id}`, {
                title,
                detail: description,
                start_date: startDate,
                end_date: endDate,
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3 w-50">
                <Row>
                    <Col>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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
