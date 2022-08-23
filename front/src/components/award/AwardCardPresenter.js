import React, { useState } from "react"
import AwardCard from "./AwardCard"
import AwardCardEdit from "./AwardCardEdit"

const AwardCardPresenter = ({
    award,
    isEditable,
    onEditButtonClickEvent,
    onDeleteButtonClickEvent,
}) => {
    const [isEditMode, setIsEditMode] = useState(false)

    const onAwardEditButtonClickEventHandler = (editedAward) => {
        onEditButtonClickEvent(editedAward)
        setIsEditMode(false)
    }

    const onCancelButtonClickEventHandler = (isCanceld) => {
        setIsEditMode(isCanceld)
    }

    const onEnterEditModeButtonClickEventHandler = () => {
        setIsEditMode((prev) => !prev)
    }

    const onDeleteButtonClickEventHandler = (targetAward) => {
        onDeleteButtonClickEvent(targetAward)
    }

    return (
        <React.Fragment>
            {isEditMode ? (
                <AwardCardEdit
                    award={award}
                    onAwardEditButtonClickEvent={
                        onAwardEditButtonClickEventHandler
                    }
                    onCancelButtonClickEvent={onCancelButtonClickEventHandler}
                />
            ) : (
                <AwardCard
                    award={award}
                    isEditable={isEditable}
                    onEnterEditModeButtonClickEvent={
                        onEnterEditModeButtonClickEventHandler
                    }
                    onDeleteButtonClickEvent={onDeleteButtonClickEventHandler}
                />
            )}
        </React.Fragment>
    )
}

export default AwardCardPresenter
