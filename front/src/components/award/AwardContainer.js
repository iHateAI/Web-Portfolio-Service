import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

import useModal from '../../hooks/useModal';

import AwardCardPresenter from './AwardCardPresenter';
import AwardCardAddForm from './AwardCardAddForm';
import * as Api from '../../api';
import TestData from '../../dev/testData';
import ConfirmModal from '../modal/ConfirmModal';

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
    Api.get(`api/award`, `?userId=${userId}`).then((res) =>
      setAwardArray(res.data),
    );
  }, [userId]);

  const onEditButtonClickEventHandler = async (editedAward) => {
    // PUT: api/award/awardId
    await Api.put(`api/award/${editedAward._id}`, {
      title: editedAward.title,
      detail: editedAward.detail,
    });
    const res = await Api.get('api/award');
    setAwardArray(res.data);
  };

  const onClickAddButtonEventHandler = () => {
    setIsAddMode(true);
  };

  const onAddSubmitButtonClickEventHandler = async (awardObj) => {
    // POST: api/award
    const newAwardObj = {
      id: awardArray.length + 1,
      title: awardObj.title,
      detail: awardObj.detail,
    };
    const result = await Api.post('api/award', newAwardObj);
    result.user_id = userId;
    const res = await Api.get('api/award');
    setAwardArray(res.data);
    setIsAddMode(false);
  };

  const onAddCancelButtonClickEventHandler = (isCanceled) => {
    setIsAddMode(isCanceled);
  };

  const onConfirmCheckButtonClickEventHandler = async (checked) => {
    // POST: awards/delete/:id
    if (checked) {
      const result = await TestData.deleteAward(userId, deleteAward);
      setAwardArray(result);
      setDeleteAward(null);
    }
  };

  const onDeleteButtonClickEventHanlder = async (award) => {
    onShowButtonClickEventHandler(true);
    setDeleteAward(award);
  };

  return (
    <div className='mvp-container'>
      <h3 className='mvp-title'>Ward</h3>
      {awardArray.map((award) => (
        <AwardCardPresenter
          key={award._id}
          award={award}
          isEditable={isEditable}
          onEditButtonClickEvent={onEditButtonClickEventHandler}
          onDeleteButtonClickEvent={onDeleteButtonClickEventHanlder}
        />
      ))}
      {isEditable && (
        <Row className='mt-3 text-center mb-4'>
          <Col sm={colStyle}>
            <Button onClick={onClickAddButtonEventHandler}>+</Button>
          </Col>
        </Row>
      )}
      {isAddMode && (
        <AwardCardAddForm
          onAddSubmitEvent={onAddSubmitButtonClickEventHandler}
          onAddCancelButtonClickEvent={onAddCancelButtonClickEventHandler}
        />
      )}

      <ConfirmModal
        msg='정말 삭제 하시겠습니까?'
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
        onCheckButtonClickEvent={onConfirmCheckButtonClickEventHandler}
      />
    </div>
  );
};

const colStyle = {
  span: 20,
};

export default AwardContainer;
