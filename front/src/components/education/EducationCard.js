import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import EducationDelete from "./EducationDelete";

function EducationCard({ isEditable, setIsEditing, education, setEducations }) {
  const { school, major, position } = education;
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{school}</span>
          <br />
          <span>{`${major} (${position})`}</span>
          <br />
        </Col>
        {isEditable && (
          <Col>
            <Button
              size="sm"
              className="me-3"
              onClick={() => setIsEditing((cur) => !cur)}
            >
              편집
            </Button>
            <EducationDelete
              education={education}
              setEducations={setEducations}
            />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
