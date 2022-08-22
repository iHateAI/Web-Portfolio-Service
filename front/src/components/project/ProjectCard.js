import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';

function ProjectCard({ project, isEditable, onClick }) {
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
        <Button
          variant='outline-info'
          size='sm'
          style={{
            height: '30px',
          }}
          onClick={onClick}>
          편집
        </Button>
      )}
    </div>
  );
}

export default ProjectCard;
