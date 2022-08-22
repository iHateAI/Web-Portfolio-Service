import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function EducationCard({ isEditable, setIsEditing, education }) {
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
            <Button onClick={() => setIsEditing((cur) => !cur)}>편집</Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
