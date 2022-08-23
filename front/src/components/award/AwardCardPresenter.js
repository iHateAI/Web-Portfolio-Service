import React, { useState } from "react"
import AwardCard from "./AwardCard"
import AwardCardEdit from "./AwardCardEdit"

const AwardCardPresenter = ({ award, isEditable, onEditButtonClickEvent }) => {
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
                />
            )}
        </React.Fragment>
    )
}

export default AwardCardPresenter
