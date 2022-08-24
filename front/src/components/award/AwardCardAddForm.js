import React, { useState, useCallback } from "react"
import useModal from "../../hooks/useModal"
import useAwardValidation from "../../hooks/useAwardValidation"

import { Form, Row, Col, Button } from "react-bootstrap"
import AlertModal from "../modal/AlertModal"

import Validation from "../../util/validation/validation"

const AwardCardAddForm = ({
    onAddSubmitEvent,
    onAddCancelButtonClickEvent,
}) => {
    const [awardTitle, setAwardTitle] = useState("")
    const [awardDescription, setAwardDescription] = useState("")

    const [
        isShow,
        onShowButtonClickEventHandler,
        onCloseButtonClickEventHandler,
    ] = useModal(false)

    const [
        checkValidationTitle,
        checkValidationDescription,
        checkValidationAll,
    ] = useAwardValidation()

    const isValidTitle = checkValidationTitle(awardTitle)
    const isValidDescription = checkValidationDescription(awardDescription)
    const isValid = checkValidationAll(isValidTitle, isValidDescription)

    const onAddAwardTitleChangeEventHandler = useCallback((e) => {
        setAwardTitle(e.target.value)
    }, [])

    const onAddAwardDescriptionChangeEventHandler = useCallback((e) => {
        setAwardDescription(e.target.value)
    }, [])

    const onAddSubmitEventHandler = (e) => {
        e.preventDefault()
        if (!isValid) {
            onShowButtonClickEventHandler()
            return
        }
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
        <React.Fragment>
            <Form onSubmit={onAddSubmitEventHandler}>
                <Form.Group controlId="formAddAwardTitle">
                    <Form.Control
                        type="text"
                        placeholder="수상내역"
                        value={awardTitle}
                        onChange={onAddAwardTitleChangeEventHandler}
                    />
                    {!isValidTitle && (
                        <Form.Text className="text-danger">
                            수상내역이 올바르지 않습니다.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlId="formAddAwardDescription">
                    <Form.Control
                        type="text"
                        placeholder="수상내역 설명"
                        value={awardDescription}
                        onChange={onAddAwardDescriptionChangeEventHandler}
                    />
                    {!isValidDescription && (
                        <Form.Text className="text-danger">
                            수상내역 설명이 올바르지 않습니다.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={colStyle}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="me-3"
                        >
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
            <AlertModal
                msg="입력이 올바르지 않습니다."
                isShow={isShow}
                onCloseButtonClickEvent={onCloseButtonClickEventHandler}
            />
        </React.Fragment>
    )
}

const colStyle = {
    span: 20,
}

export default AwardCardAddForm
