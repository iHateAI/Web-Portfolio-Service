import React from 'react';
import { Button, ButtonGroup, Card, Row } from 'react-bootstrap';
// import { deleteProject } from './dev/mockApiProject';
import TestData from '../../dev/testData';
import useModal from '../../hooks/useModal';
import ConfirmModal from '../modal/ConfirmModal';

function ProjectCard({ project, isEditable, editClick, getUser }) {
    const [
        isShow,
        onShowButtonClickEventHandler,
        onCloseButtonClickEventHandler,
    ] = useModal(false);

    const handleDeleteProject = async (bool) => {
        // await deleteProject(project.key);
        await TestData.deleteProject(project._id);
        getUser();
    };

    return (
        <div className="d-flex justify-content-between align-items-center">
            <Row>
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Subtitle>{project.detail}</Card.Subtitle>
                    <Card.Text>
                        {project.startDate} ~ {project.endDate}
                    </Card.Text>
                </Card.Body>
            </Row>
            {isEditable && (
                <ButtonGroup>
                    <Button
                        variant="outline-info"
                        size="sm"
                        style={{
                            height: '30px',
                        }}
                        onClick={editClick}
                    >
                        편집
                    </Button>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        style={{
                            height: '30px',
                        }}
                        onClick={onShowButtonClickEventHandler}
                    >
                        삭제
                    </Button>
                </ButtonGroup>
            )}
            <ConfirmModal
                isShow={isShow}
                onCloseButtonClickEvent={onCloseButtonClickEventHandler}
                onCheckButtonClickEvent={handleDeleteProject}
                msg={`${project.title}(을)를 목록에서 삭제하시겠습니까?`}
            />
        </div>
    );
}

export default ProjectCard;
