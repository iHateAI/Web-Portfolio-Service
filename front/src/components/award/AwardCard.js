const AwardCard = ({
  award,
  isEditable,
  onEnterEditModeButtonClickEvent,
  onDeleteButtonClickEvent,
}) => {
  const handleEnterEditModeButtonClick = () => {
    onEnterEditModeButtonClickEvent();
  };

  const handleDeleteButtonClick = () => {
    onDeleteButtonClickEvent(award);
  };

  return (
    <div className="mvp-content-detail">
      <div className="mvp-info">
        <h3 className="title">{award.title}</h3>

        <p className="sub-title">
          <span>{award.detail}</span>
        </p>
      </div>
      {isEditable && (
        <div className="mvp-management">
          <button
            onClick={handleEnterEditModeButtonClick}
            className="mvp-edit-button"
          >
            edit
          </button>
          <button
            onClick={handleDeleteButtonClick}
            className="mvp-delete-button"
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AwardCard;
