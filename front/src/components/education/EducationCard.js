import React from "react";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";
import * as Api from "../../api";

function EducationCard({
  education,
  isEditable,
  onEditButtonClickEvent,
  fetchEducations,
}) {
  const [isShow, handleShowButtonClickEvent, handleCloseButtonClickEvent] =
    useModal(false);

  const { university, major, status } = education || {};

  const handleDeleteEducation = async () => {
    await Api.delete("api/education", education._id);
    fetchEducations();
  };

  return (
    <div className="mvp-content-detail">
      <div className="mvp-info">
        <h3 className="title">{university}</h3>
        <div className="sub-title">
          <span>{`${major} (${status})`}</span>
        </div>
      </div>
      {isEditable && (
        <div className="mvp-management">
          <button className="mvp-edit-button" onClick={onEditButtonClickEvent}>
            EDIT
          </button>
          <div className="mvp-button-divline" />
          <button
            className="mvp-delete-button"
            onClick={handleShowButtonClickEvent}
          >
            DELETE
          </button>
        </div>
      )}
      <ConfirmModal
        isShow={isShow}
        onCloseButtonClickEvent={handleCloseButtonClickEvent}
        onCheckButtonClickEvent={handleDeleteEducation}
        msg={`해당 항목을 목록에서 삭제하시겠습니까?`}
      />
    </div>
  );
}

export default EducationCard;
