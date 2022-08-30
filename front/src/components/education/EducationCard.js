import React from "react";
import EducationDelete from "./EducationDelete";

function EducationCard({ isEditable, setIsEditing, education, getEducation }) {
  const { university, major, status } = education;
  return (
    <div className="mvp-content-detail">
      <div className="mvp-info">
        <h3 className="title">{university}</h3>
        <p className="sub-title">
          <span>{`${major} (${status})`}</span>
        </p>
      </div>
      {isEditable && (
        <div className="mvp-management">
          <button
            className="mvp-edit-button"
            onClick={() => setIsEditing((cur) => !cur)}
          >
            EDIT
          </button>
          <EducationDelete education={education} getEducation={getEducation} />
        </div>
      )}
    </div>
  );
}

export default EducationCard;
