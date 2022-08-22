import React, { useEffect, useState } from "react";

function Education({ education, setEducations }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(falase);
  // useState 훅을 통해 education 상태를 생성함.

  useEffect(() => {
    // 'education/유저id' 엔드포인트로 GET 요청을 하고, education을 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setEducation(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard
          education={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Education;
