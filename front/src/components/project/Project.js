import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

function Project({ project, isEditable, getUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          project={project}
          editClick={handleIsEditing}
          getUser={getUser}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          editClick={handleIsEditing}
          getUser={getUser}
        />
      )}
    </>
  );
}

export default Project;
