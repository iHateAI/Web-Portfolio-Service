import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
function Education({ isEditable, education, getEducation }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 education 상태를 생성함.

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          getEducation={getEducation}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard
          education={education}
          getEducation={getEducation}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Education;
