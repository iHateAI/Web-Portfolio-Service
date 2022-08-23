import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Api from "../../testApi";

// Education 삭제

function EducationDelete({ education, setEducations }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async () => {
    const user_id = education.user_id;

    await Api.del(`educations/${education.id}`);

    const res = await Api.get("educationlist", user_id);
    const updatedAward = res.data;

    await setEducations(updatedAward);
    setShow(false);
  };

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleShow}>
        삭제
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>학력 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EducationDelete;
