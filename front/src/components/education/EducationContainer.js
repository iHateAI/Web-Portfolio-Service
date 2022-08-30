import React, { useCallback, useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
// import * as Api from "../../testApi";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

function EducationContainer({ portfolioOwnerId, isEditable }) {
  //useState 훅을통해 educations, addEducation 상태를 생성함.
  const [educations, setEducations] = useState([]);
  const [addEducation, setAddEducation] = useState(false);

  const getEducation = useCallback(() => {
    Api.get(`api/education`, `?userId=${portfolioOwnerId}`).then((res) =>
      setEducations(res.data.data)
    );
  }, [portfolioOwnerId]);

  useEffect(() => {
    // "educationlist/유저id" GET 요청, educations를 response의 data로 세팅함.
    getEducation();
  }, [getEducation]);

  return (
    <div className="mvp-container">
      <h3 className="mvp-title">Education</h3>

      {educations.map((education) => (
        <Education
          key={education._id}
          education={education}
          getEducation={getEducation}
          isEditable={isEditable}
        />
      ))}
      {isEditable && (
        <Row className="text-center mb-4">
          <Col>
            <Button size="md" onClick={() => setAddEducation(true)}>
              +
            </Button>
          </Col>
        </Row>
      )}
      {addEducation && (
        <EducationAddForm
          portfolioOwnerId={portfolioOwnerId}
          getEducation={getEducation}
          setAddEducation={setAddEducation}
        />
      )}
    </div>
  );
}

export default EducationContainer;
