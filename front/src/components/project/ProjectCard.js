import React from "react";
import { Row } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, editClick, getUser }) {
  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  const { title, detail, startDate, endDate } = project || {};

  const handleDeleteProject = async (bool) => {
    // await deleteProject(key);
    await Api.delete("api/project", project._id);
    getUser();
  };

  return (
    <div className="mvp-content-detail">
      <Row>
        <div className="mvp-info">
          <h3 className="title">{title}</h3>
          <p className="sub-title">{detail}</p>
          <p className="sub-title">
            {startDate} ~ {endDate}
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
        msg={`${title}(을)를 목록에서 삭제하시겠습니까?`}
      />
    </div>
  );
}

export default ProjectCard;
