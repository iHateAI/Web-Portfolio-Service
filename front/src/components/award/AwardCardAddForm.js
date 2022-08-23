import { useState, useCallback } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

const AwardCardAddForm = ({
    onAddSubmitEvent,
    onAddCancelButtonClickEvent,
}) => {
    const [awardTitle, setAwardTitle] = useState("")
    const [awardDescription, setAwardDescription] = useState("")

    const onAddAwardTitleChangeEventHandler = useCallback((e) => {
        setAwardTitle(e.target.value)
    }, [])

    const onAddAwardDescriptionChangeEventHandler = useCallback((e) => {
        setAwardDescription(e.target.value)
    }, [])

    const onAddSubmitEventHandler = (e) => {
        e.preventDefault()
        const awardObj = {
            title: awardTitle,
            description: awardDescription,
        }
        onAddSubmitEvent(awardObj)
    }

    const onAddCancelButtonClickEventHandler = () => {
        onAddCancelButtonClickEvent(false)
    }

    return (
        <Form onSubmit={onAddSubmitEventHandler}>
            <Form.Group controlId="formAddAwardTitle">
                <Form.Control
                    type="text"
                    placeholder="수상내역"
                    value={awardTitle}
                    onChange={onAddAwardTitleChangeEventHandler}
                />
            </Form.Group>
            <Form.Group controlId="formAddAwardDescription">
                <Form.Control
                    type="text"
                    placeholder="수상내역 설명"
                    value={awardDescription}
                    onChange={onAddAwardDescriptionChangeEventHandler}
                />
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={colStyle}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onAddCancelButtonClickEventHandler}
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

export default AwardCardAddForm
