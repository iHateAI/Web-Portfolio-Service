import { useState, useEffect, useCallback } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AwardCardPresenter from "./AwardCardPresenter";
import AwardCardAddForm from "./AwardCardAddForm";
import * as Api from "../../api";

const AwardContainer = ({ portfolioOwnerId, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [awards, setAwards] = useState([]);

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
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
    <div className="mvp-container">
      <h3 className="mvp-title">Award</h3>
      {awards &&
        awards.map((award) => (
          <AwardCardPresenter
            award={award}
            isEditable={isEditable}
            fetchAwards={fetchAwards}
            key={award._id}
          />
        ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={colStyle}>
            <Button onClick={handleIsEditing}>+</Button>
          </Col>
        </Row>
      )}
      {isEditing && (
        <AwardCardAddForm
          onCancelButtonClickEvent={handleIsEditing}
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
