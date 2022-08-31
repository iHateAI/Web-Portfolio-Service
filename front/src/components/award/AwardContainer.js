import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import AwardCardPresenter from "./AwardCardPresenter";
import AwardCardAddForm from "./AwardCardAddForm";
import * as Api from "../../api";
import ConfirmModal from "../modal/ConfirmModal";

const AwardContainer = ({ userId, isEditable }) => {
  const [awardArray, setAwardArray] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [deleteAward, setDeleteAward] = useState(null);

  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  useEffect(() => {
    // GET: api/award
    Api.get(`api/award`, `?userId=${userId}`).then((res) => {
      setAwardArray(res.data.data);
    });
  }, [userId]);

  const hanldeEditButtonClick = async (editedAward) => {
    // PUT: api/award/awardId
    await Api.put(`api/award/${editedAward._id}`, {
      title: editedAward.title,
      detail: editedAward.detail,
    });
    const res = await Api.get("api/award", `?userId=${userId}`);
    setAwardArray(res.data.data);
  };

  const handleAddButtonClick = () => {
    setIsAddMode(true);
  };

  const handleAddSubmitClick = async (awardObj) => {
    // POST: api/award
    const newAwardObj = {
      id: awardArray.length + 1,
      title: awardObj.title,
      detail: awardObj.detail,
    };
    const result = await Api.post("api/award", newAwardObj);
    result.user_id = userId;
    const res = await Api.get("api/award", `?userId=${userId}`);
    setAwardArray(res.data.data);
    setIsAddMode(false);
  };

  const handleAddCancelClick = (isCanceled) => {
    setIsAddMode(isCanceled);
  };

  const handleConfirmCheckButtonClick = async (checked) => {
    // DELETE: api/award/:id
    if (checked) {
      await Api.delete("api/award", deleteAward._id);
      setAwardArray((prev) =>
        prev.filter((item) => item._id !== deleteAward._id)
      );
      setDeleteAward(null);
    }
  };

  const handleDeleteButtonClick = async (award) => {
    onShowButtonClickEventHandler(true);
    setDeleteAward(award);
  };

  return (
    <div className="mvp-content">
      <h3 className="mvp-title">Award</h3>
      {awardArray.map((award) => (
        <AwardCardPresenter
          key={award._id}
          award={award}
          isEditable={isEditable}
          onEditButtonClickEvent={hanldeEditButtonClick}
          onDeleteButtonClickEvent={handleDeleteButtonClick}
        />
      ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={colStyle}>
            <Button onClick={handleAddButtonClick}>+</Button>
          </Col>
        </Row>
      )}
      {isAddMode && (
        <AwardCardAddForm
          onAddSubmitEvent={handleAddSubmitClick}
          onAddCancelButtonClickEvent={handleAddCancelClick}
        />
      )}

      <ConfirmModal
        msg="정말 삭제 하시겠습니까?"
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
        onCheckButtonClickEvent={handleConfirmCheckButtonClick}
      />
    </div>
  );
};

const colStyle = {
  span: 20,
};

export default AwardContainer;
