import React, { useState, useEffect, useCallback } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const fetchProjects = useCallback(() => {
    Api.get("api/project", `?projectsId=${portfolioOwnerId}`).then((res) =>
      setProjects(res.data.data)
    );
  }, [portfolioOwnerId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="mvp-container">
      <h3 className="mvp-title">프로젝트</h3>
      {projects &&
        projects.map((project) => (
          <Project
            project={project}
            isEditable={isEditable}
            fetchProjects={fetchProjects}
            key={project._id}
          />
        ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col>
            <Button onClick={handleIsEditing}>+</Button>
          </Col>
        </Row>
      )}
      {isEditing && (
        <ProjectAddForm
          onCancelButtonClickEvent={handleIsEditing}
          fetchProjects={fetchProjects}
        />
      )}
    </div>
  );
}

export default Projects;
