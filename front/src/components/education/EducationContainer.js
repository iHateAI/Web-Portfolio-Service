import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

function EducationContainer({ portfolioOwnerId, isEditable }) {
  //useState 훅을통해 educations, addEducation 상태를 생성함.
  const [educations, setEducations] = useState([]);
  const [addEducation, setAddEducation] = useState(false);
  const userId = portfolioOwnerId;
  useEffect(() => {
    // "educationlist/유저id" GET 요청, educations를 response의 data로 세팅함.
    Api.get(`api/education`, `?userId=${userId}`).then((res) =>
      setEducations(res.data)
    );
  }, [userId]);

  return (
    <div className="mvp-container">
      <h3 className="mvp-title">Education</h3>
      {educations.map((education) => (
        <Education
          key={education._id}
          education={education}
          setEducations={setEducations}
          isEditable={isEditable}
        />
      ))}
      {addEducation && (
        <EducationAddForm
          portfolioOwnerId={portfolioOwnerId}
          setEducations={setEducations}
          setAddEducation={setAddEducation}
        />
      )}
      {isEditable && (
        <Row className="text-center mb-4">
          <Col>
            <Button size="md" onClick={() => setAddEducation(true)}>
              +
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default EducationContainer;
