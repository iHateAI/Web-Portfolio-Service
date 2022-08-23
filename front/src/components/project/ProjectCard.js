import React from "react"
import { Button, ButtonGroup, Card, Row } from "react-bootstrap"
// import { deleteProject } from './dev/mockApiProject';
import TestData from "../../dev/testData"

function ProjectCard({ project, isEditable, editClick, getUser }) {
    const handleDeleteProject = async () => {
        // await deleteProject(project.key);
        await TestData.deleteProject(project.key)
        getUser()
    }

    return (
        <div className="d-flex justify-content-between align-items-center">
            <Row>
                <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Subtitle>{project.description}</Card.Subtitle>
                    <Card.Text>
                        {project.date.start} ~ {project.date.end}
                    </Card.Text>
                </Card.Body>
            </Row>
            {isEditable && (
                <ButtonGroup>
                    <Button
                        variant="outline-info"
                        size="sm"
                        style={{
                            height: "30px",
                        }}
                        onClick={editClick}
                    >
                        편집
                    </Button>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        style={{
                            height: "30px",
                        }}
                        onClick={handleDeleteProject}
                    >
                        삭제
                    </Button>
                </ButtonGroup>
            )}
        </div>
    )
}

export default ProjectCard
