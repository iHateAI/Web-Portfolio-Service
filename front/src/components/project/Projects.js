import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
//import TestData from '../../dev/testData';
import * as Api from "../../api";
import { useCallback } from "react";

function Projects({ portfolioOwnerId, isEditable }) {
  //api 요청에 사용할 값, 편집 가능 여부
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState([]);
  const userId = portfolioOwnerId;
  //state

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  //버튼 및 ProjectAddForm에 넘겨줄 isEditing 변경함수

  const getUser = useCallback(() => {
    Api.get("api/project", `?userId=${userId}`).then((res) =>
      setUser(res.data.data)
    );
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  //컴포넌트 mount시 모의 데이터 호출

  return (
    <div className="mvp-container">
      <h3 className="mvp-title">프로젝트</h3>
      {user &&
        user.map((project, index) => (
          <Project
            project={project}
            isEditable={isEditable}
            getUser={getUser}
            key={index}
          />
        ))}
      <div className="d-flex justify-content-center w-100">
        {isEditable && (
          <Button
            variant="primary"
            className="text-center"
            onClick={handleIsEditing}
          >
            +
          </Button>
        )}
      </div>
      {isEditing && (
        <ProjectAddForm onClick={handleIsEditing} getUser={getUser} />
      )}
    </div>
  );
}

export default Projects;
