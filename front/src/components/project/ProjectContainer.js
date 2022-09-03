import React, { useState, useEffect, useCallback } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";

function ProjectContainer({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleIsAdding = () => {
    setIsAdding(!isAdding);
  };

  const fetchProjects = useCallback(() => {
    Api.get("api/project", `?userId=${portfolioOwnerId}`).then((res) =>
      setProjects(res.data.data)
    );
  }, [portfolioOwnerId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="mvp-content">
      <h3 className="mvp-title">Project</h3>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Project
            project={project}
            isEditable={isEditable}
            fetchProjects={fetchProjects}
            key={project._id}
          />
        ))
      ) : (
        <div className="mvp-alert-div">작성된 내용이 없습니다.</div>
      )}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col>
            <Button onClick={handleIsAdding}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && (
        <ProjectAddForm
          onCancelButtonClickEvent={handleIsAdding}
          fetchProjects={fetchProjects}
        />
      )}
    </div>
  );
}

export default ProjectContainer;
