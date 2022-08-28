import React from "react";
import { Button, ButtonGroup, Card, Row } from "react-bootstrap";
// import { deleteProject } from './dev/mockApiProject';
import TestData from "../../dev/testData";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";

function ProjectCard({ project, isEditable, editClick, getUser }) {
  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  const handleDeleteProject = async (bool) => {
    // await deleteProject(project.key);
    await TestData.deleteProject(project._id);
    getUser();
  };

  return (
    <div className="mvp-content-detail">
      <Row>
        <div className="mvp-info">
          <h3 className="title">{project.title}</h3>
          <p className="sub-title">{project.detail}</p>
          <p className="sub-title">
            {project.startDate} ~ {project.endDate}
          </p>
        </div>
      </Row>
      {isEditable && (
        <div className="mvp-management">
          <button className="mvp-edit-button" onClick={editClick}>
            편집
          </button>
          <button
            className="mvp-delete-button"
            onClick={onShowButtonClickEventHandler}
          >
            삭제
          </button>
        </div>
      )}
      <ConfirmModal
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
        onCheckButtonClickEvent={handleDeleteProject}
        msg={`${project.title}(을)를 목록에서 삭제하시겠습니까?`}
      />
    </div>
  );
}

export default ProjectCard;
