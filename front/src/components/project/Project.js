import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

function Project({ project, portfolioOwnerId, isEditable }) {
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
          portfolioOwnerId={portfolioOwnerId}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          onClick={handleOnClick}
        />
      )}
    </>
  );
}

export default Project;
