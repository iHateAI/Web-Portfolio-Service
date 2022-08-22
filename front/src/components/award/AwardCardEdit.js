import { useState, useCallback } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

const AwardCardEdit = ({
    award,
    onAwardEditButtonClickEvent,
    onCancelButtonClickEvent,
}) => {
    const [awardTitle, setAwardTitle] = useState(award.title)
    const [awardDescription, setAwardDescription] = useState(award.description)

    const onSubmitEventHander = (e) => {
        e.preventDefault()
        const editedAward = {
            id: award.Id,
            awardTitle: awardTitle,
            awardDescription: awardDescription,
        }
        onAwardEditButtonClickEvent(editedAward)
    }

    const onAwardTitleChangeEventHandler = useCallback((e) => {
        setAwardTitle(e.target.value)
    }, [])

    const onAwardDescriptionChangeEventHandler = useCallback((e) => {
        setAwardDescription(e.target.value)
    }, [])

    const onCancelButtonClickEventHandler = () => {
        onCancelButtonClickEvent(false)
    }

    return (
        <Form submit={onSubmitEventHander}>
            <Form.Group controlled="formAwardTitle">
                <Form.Control
                    type="text"
                    placeholder="수상내역"
                    value={awardTitle}
                    onChange={onAwardTitleChangeEventHandler}
                />
            </Form.Group>
            <Form.Group controlled="formAwardDescription">
                <Form.Control
                    type="text"
                    placeholder="수상내역 설명"
                    value={awardDescription}
                    onChange={onAwardDescriptionChangeEventHandler}
                />
            </Form.Group>
            <Form.Group as={Row} className="mt-5 text-center mb-5">
                <Col sm={colStyle}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onCancelButtonClickEventHandler}
                    >
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

const colStyle = {
    span: 20,
}

export default AwardCardEdit
