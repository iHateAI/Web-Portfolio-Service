import { useState, useEffect, useCallback } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AwardCardPresenter from "./AwardCardPresenter";
import AwardCardAddForm from "./AwardCardAddForm";
import * as Api from "../../api";

const AwardContainer = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [awards, setAwards] = useState([]);

  const handleIsAdding = () => {
    setIsAdding(!isAdding);
  };

  const fetchAwards = useCallback(() => {
    Api.get(`api/award`, `?userId=${portfolioOwnerId}`).then((res) => {
      setAwards(res.data.data);
    });
  }, [portfolioOwnerId]);

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);

  return (
    <div className="mvp-content">
      <h3 className="mvp-title">Award</h3>
      {awards.length ? (
        awards.map((award) => (
          <AwardCardPresenter
            award={award}
            isEditable={isEditable}
            fetchAwards={fetchAwards}
            key={award._id}
          />
        ))
      ) : (
        <div className="mvp-alert-div">작성된 내용이 없습니다.</div>
      )}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={colStyle}>
            <Button onClick={handleIsAdding}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && (
        <AwardCardAddForm
          onCancelButtonClickEvent={handleIsAdding}
          fetchAwards={fetchAwards}
        />
      )}
    </div>
  );
};

const colStyle = {
  span: 20,
};

export default AwardContainer;
