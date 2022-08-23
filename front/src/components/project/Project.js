import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

function Project({ project, isEditable, handleDeleteClick, updateClosure }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleOnClick = () => {
    setIsEditing(!isEditing);
  };
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          project={project}
          onClick={handleOnClick}
          updateClosure={updateClosure}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          editClick={handleOnClick}
          deleteClick={handleDeleteClick}
        />
      )}
    </>
  );
}

export default Project;
