import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Project from './Project';
import ProjectAddForm from './ProjectAddForm';

Projects.defaultProps = {
  isEditable: true,
};
//테스트용 props 기본값

function Projects({ portfolioOwnerId, isEditable }) {
  //api 요청에 사용할 값, 편집 가능 여부
  const [isEditing, setIsEditing] = useState(false);
  //편집 상태 state
  const [user, setUser] = useState(null);
  //유저 정보 state

  const handleOnClick = () => {
    setIsEditing(!isEditing);
  };
  //버튼 및 ProjectAddForm에 넘겨줄 isEditing 변경함수

  useEffect(() => {
    fetch('/api-mock.json')
      .then((res) => res.json())
      .then((json) => setUser(json.data));
  }, []);
  //컴포넌트 mount시 모의 데이터 호출

  return (
    <div className='px-3 w-75'>
      <h3>프로젝트</h3>
      {user?.projects?.map((project) => (
        <Project project={project} isEditable={isEditable} key={project.key} />
      ))}
      <div className='d-flex justify-content-center w-100'>
        {isEditable && (
          <Button
            variant='primary'
            className='text-center'
            onClick={handleOnClick}>
            +
          </Button>
        )}
      </div>
      {isEditing && <ProjectAddForm onClick={handleOnClick} />}
    </div>
  );
}

export default Projects;
