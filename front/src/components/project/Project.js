import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ project, isEditable, fetchProjects }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          project={project}
          onEditButtonClickEvent={handleIsEditing}
          fetchProjects={fetchProjects}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          onEditButtonClickEvent={handleIsEditing}
          fetchProjects={fetchProjects}
        />
      )}
    </>
  );
}

export default Project;
