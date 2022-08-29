import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardCardEdit from "./AwardCardEdit";

const AwardCardPresenter = ({
  award,
  isEditable,
  onEditButtonClickEvent,
  onDeleteButtonClickEvent,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAwardEditButtonClick = (editedAward) => {
    onEditButtonClickEvent(editedAward);
    setIsEditMode(false);
  };

  const handleCancelButtonClick = (isCanceld) => {
    setIsEditMode(isCanceld);
  };

  const handleEnterEditModeButtonClick = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleDeleteButtonClick = (targetAward) => {
    onDeleteButtonClickEvent(targetAward);
  };

  return (
    <React.Fragment>
      {isEditMode ? (
        <AwardCardEdit
          award={award}
          onAwardEditButtonClickEvent={handleAwardEditButtonClick}
          onCancelButtonClickEvent={handleCancelButtonClick}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          onEnterEditModeButtonClickEvent={handleEnterEditModeButtonClick}
          onDeleteButtonClickEvent={handleDeleteButtonClick}
        />
      )}
    </React.Fragment>
  );
};

export default AwardCardPresenter;
