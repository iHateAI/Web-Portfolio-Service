import { Card, Col, Row, Button } from "react-bootstrap"

const AwardCard = ({
    award,
    isEditable,
    onEnterEditModeButtonClickEvent,
    onDeleteButtonClickEvent,
}) => {
    const onEnterEditModeButtonClickEventHandler = () => {
        onEnterEditModeButtonClickEvent()
    }

    const onDeleteButtonClickEventHandler = () => {
        onDeleteButtonClickEvent(award)
    }

    return (
        <Card>
            <Row className="align-items-center">
                <Col>
                    <Card.Title>{award.title}</Card.Title>
                    <br />
                    <Card.Subtitle>{award.detail}</Card.Subtitle>
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
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={onDeleteButtonClickEventHandler}
                            className="mr-3"
                        >
                            삭제
                        </Button>
                    </Col>
                )}
            </Row>
        </Card>
    )
}

export default AwardCard
