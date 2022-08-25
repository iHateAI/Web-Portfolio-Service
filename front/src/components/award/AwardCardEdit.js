import React, { useState, useCallback } from "react"
import useModal from "../../hooks/useModal"
import useAwardValidation from "../../hooks/useAwardValidation"

import { Form, Row, Col, Button } from "react-bootstrap"
import AlertModal from "../modal/AlertModal"

const AwardCardEdit = ({
    award,
    onAwardEditButtonClickEvent,
    onCancelButtonClickEvent,
}) => {
    const [awardTitle, setAwardTitle] = useState(award.title)
    const [awardDetail, setAwardDetail] = useState(award.detail)

    const [
        isShow,
        onShowButtonClickEventHandler,
        onCloseButtonClickEventHandler,
    ] = useModal(false)

    const [checkValidationTitle, checkValidationDetail, checkValidationAll] =
        useAwardValidation()

    const isValidTitle = checkValidationTitle(awardTitle)
    const isValidDetail = checkValidationDetail(awardDetail)
    const isValid = checkValidationAll(isValidTitle, isValidDetail)

    const onSubmitEventHander = (e) => {
        e.preventDefault()
        if (!isValid) {
            onShowButtonClickEventHandler()
            return
        }
        const editedAward = {
            _id: award._id,
            title: awardTitle,
            detail: awardDetail,
        }
        onAwardEditButtonClickEvent(editedAward)
    }

    const onAwardTitleChangeEventHandler = useCallback((e) => {
        setAwardTitle(e.target.value)
    }, [])

    const onAwardDetailChangeEventHandler = useCallback((e) => {
        setAwardDetail(e.target.value)
    }, [])

    const onCancelButtonClickEventHandler = () => {
        onCancelButtonClickEvent(false)
    }

    return (
        <React.Fragment>
            <Form onSubmit={onSubmitEventHander}>
                <Form.Group controlled="formAwardTitle">
                    <Form.Control
                        type="text"
                        placeholder="수상내역"
                        value={awardTitle}
                        onChange={onAwardTitleChangeEventHandler}
                    />
                    {!isValidTitle && (
                        <Form.Text className="text-danger">
                            수상내역이 올바르지 않습니다.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlled="formAwardDetail">
                    <Form.Control
                        type="text"
                        placeholder="수상내역 설명"
                        value={awardDetail}
                        onChange={onAwardDetailChangeEventHandler}
                    />
                    {!isValidDetail && (
                        <Form.Text className="text-danger">
                            수상내역 설명이 올바르지 않습니다.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group as={Row} className="mt-5 text-center mb-5">
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
                            onClick={onCancelButtonClickEventHandler}
                        >
                            취소
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
            <AlertModal
                msg="편집 입력이 올바르지 않습니다."
                isShow={isShow}
                onCloseButtonClickEvent={onCloseButtonClickEventHandler}
            />
        </React.Fragment>
    )
}

const colStyle = {
    span: 20,
}

export default AwardCardEdit
