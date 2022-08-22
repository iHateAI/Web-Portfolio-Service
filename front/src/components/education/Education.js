import React, { useEffect, useState } from "react";

function Education({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(falase);
  // useState 훅을 통해 education 상태를 생성함.
  const [education, setEducation] = useState(null);

  useEffect(() => {
    // 'education/유저id' 엔드포인트로 GET 요청을 하고, education을 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setEducation(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          setEducation={setEducation}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard
          education={education}
          setEducation={setEducation}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Education;
