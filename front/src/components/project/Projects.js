import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Project from './Project';
import ProjectAddForm from './ProjectAddForm';
import { getProjects, deleteProject, postProject } from './dev/mockApiProject';

Projects.defaultProps = {
  portfolioOwnerId: 'dhekgus1122',
  isEditable: true,
};
//테스트용 props 기본값

function Projects({ portfolioOwnerId, isEditable }) {
  //api 요청에 사용할 값, 편집 가능 여부
  const [isEditing, setIsEditing] = useState(false);
  //편집 상태 state
  const [user, setUser] = useState(null);
  //유저 정보 state

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  //버튼 및 ProjectAddForm에 넘겨줄 isEditing 변경함수

  const getUser = async () => {
    const fetchUser = await getProjects();
    setUser({ ...fetchUser.data });
  };

  const handleDeleteClick = async (key) => {
    await deleteProject(key);
    getUser();
  };

  const updateClosure = (key) => {
    const update = {};
    update.key = key;
    const setUpdate = (project) => {
      update.project = { ...project };
    };
    const postUpdate = async () => {
      await postProject(update.key, update.project);
      getUser();
    };
    return { setUpdate, postUpdate };
  };

  useEffect(() => {
    getUser();
  }, []);
  //컴포넌트 mount시 모의 데이터 호출

  return (
    <div className='px-3 w-75'>
      <h3>프로젝트</h3>
      {user?.projects?.map((project, index) => (
        <Project
          project={project}
          isEditable={isEditable}
          handleDeleteClick={() => {
            handleDeleteClick(project.key);
          }}
          updateClosure={updateClosure(project.key)}
          key={index}
        />
      ))}
      <div className='d-flex justify-content-center w-100'>
        {isEditable && (
          <Button
            variant='primary'
            className='text-center'
            onClick={handleEditClick}>
            +
          </Button>
        )}
      </div>
      {isEditing && (
        <ProjectAddForm onClick={handleEditClick} getUser={getUser} />
      )}
    </div>
  );
}

export default Projects;
