import React, { useEffect, useState } from "react"
import { Card, Button, Row, Col } from "react-bootstrap"

import TestData from "../../dev/testData"
// import * as Api from "../../testApi";
import Education from "./Education"
import EducationAddForm from "./EducationAddForm"

function EducationContainer({ portfolioOwnerId, isEditable }) {
    //useState 훅을통해 educations, addEducation 상태를 생성함.
    const [educations, setEducations] = useState([])
    const [addEducation, setAddEducation] = useState(false)
    useEffect(() => {
        // "educationlist/유저id" GET 요청, educations를 response의 data로 세팅함.
        // Api.get("educationlist", portfolioOwnerId).then((res) =>
        //   setEducations(res.data)
        // );
        TestData.getEducations(portfolioOwnerId).then((res) => {
            setEducations(res)
        })
    }, [portfolioOwnerId])

    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-4">학력</Card.Title>
                {educations.map((education) => (
                    <Education
                        key={education.id}
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
                            <Button
                                size="md"
                                onClick={() => setAddEducation(true)}
                            >
                                +
                            </Button>
                        </Col>
                    </Row>
                )}
            </Card.Body>
        </Card>
    )
}

export default EducationContainer
