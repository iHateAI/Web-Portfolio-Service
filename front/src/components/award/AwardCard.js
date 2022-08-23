import { Card, Col, Row, Button } from "react-bootstrap"

const AwardCard = ({ award, isEditable, onEnterEditModeButtonClickEvent }) => {
    const onEnterEditModeButtonClickEventHandler = () => {
        onEnterEditModeButtonClickEvent()
    }

    return (
        <Card>
            <Row className="align-items-center">
                <Col>
                    <Card.Title>{award.title}</Card.Title>
                    <br />
                    <Card.Subtitle>{award.description}</Card.Subtitle>
                </Col>
                {isEditable && (
                    <Col xs lg="1">
                        <Button
                            variant="outline-info"
                            size="sm"
                            onClick={onEnterEditModeButtonClickEventHandler}
                            className="mr-3"
                        >
                            편집
                        </Button>
                    </Col>
                )}
            </Row>
        </Card>
    )
}

export default AwardCard
