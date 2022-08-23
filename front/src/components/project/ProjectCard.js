import React from 'react';
import { Button, ButtonGroup, Card, Row } from 'react-bootstrap';

function ProjectCard({ project, isEditable, editClick, deleteClick }) {
  return (
    <div className='d-flex justify-content-between align-items-center'>
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
            variant='outline-info'
            size='sm'
            style={{
              height: '30px',
            }}
            onClick={editClick}>
            편집
          </Button>
          <Button
            variant='outline-danger'
            size='sm'
            style={{
              height: '30px',
            }}
            onClick={deleteClick}>
            삭제
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
}

export default ProjectCard;
