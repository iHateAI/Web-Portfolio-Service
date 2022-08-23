import { useState, useEffect } from "react"
import { Card, Row, Col, Button } from "react-bootstrap"
import AwardCardPresenter from "./AwardCardPresenter"
import AwardCardAddForm from "./AwardCardAddForm"
import AwardTestData from "../../dev/testData"

const AwardContainer = ({ userId, isEditable }) => {
    const [awardArray, setAwardArray] = useState([])
    const [isAddMode, setIsAddMode] = useState(false)

    useEffect(() => {
        // GET: awards/:userId
        AwardTestData.getAwards(userId).then((data) => setAwardArray(data))
    }, [userId])

    const onEditButtonClickEventHandler = async (editedAward) => {
        // PUT: awards/:award_id
        const result = await AwardTestData.updateAward(userId, editedAward)
        setAwardArray(result)
    }

    const onClickAddButtonEventHandler = () => {
        setIsAddMode(true)
    }

    const onAddSubmitButtonClickEventHandler = async (awardObj) => {
        // POST: awards/create
        const newAwardObj = {
            user_id: userId,
            id: awardArray.length + 1,
            ...awardObj,
        }
        await AwardTestData.createAward(userId, newAwardObj)
        const result = await AwardTestData.getAwards(userId)
        setAwardArray(result)
        setIsAddMode(false)
    }

    const onAddCancelButtonClickEventHandler = (isCanceled) => {
        setIsAddMode(isCanceled)
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>수상이력</Card.Title>
                {awardArray.map((award) => (
                    <AwardCardPresenter
                        key={award.id}
                        award={award}
                        isEditable={isEditable}
                        onEditButtonClickEvent={onEditButtonClickEventHandler}
                    />
                ))}
                {isEditable && (
                    <Row className="mt-3 text-center mb-4">
                        <Col sm={colStyle}>
                            <Button onClick={onClickAddButtonEventHandler}>
                                +
                            </Button>
                        </Col>
                    </Row>
                )}
                {isAddMode && (
                    <AwardCardAddForm
                        onAddSubmitEvent={onAddSubmitButtonClickEventHandler}
                        onAddCancelButtonClickEvent={
                            onAddCancelButtonClickEventHandler
                        }
                    />
                )}
            </Card.Body>
        </Card>
    )
}

const colStyle = {
    span: 20,
}

export default AwardContainer
