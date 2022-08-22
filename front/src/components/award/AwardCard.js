import { Card, Col, Row, Button } from "react-bootstrap"

const AwardCard = ({ award, isEditable, onEnterEditModeButtonClickEvent }) => {
    const onEnterEditModeButtonClickEventHandler = () => {
        onEnterEditModeButtonClickEvent()
    }

    return (
        <Card>
            <Row className="align-items-center">
                <Col>
                    <span>{award.title}</span>
                    <br />
                    <span className="text-muted">{award.description}</span>
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
