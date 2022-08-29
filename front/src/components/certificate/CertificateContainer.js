import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";

function CertificateContainer({ portfolioOwnerId, isEditable }) {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteCertificationId, setDeleteCertificationId] = useState("");
  const userId = portfolioOwnerId;
  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  useEffect(() => {
    Api.get("api/certification", `?userId=${userId}`).then((res) =>
      setCertificates(res.data.data)
    );
  }, [userId]);

  const handleDeleteButton = async (certificationId) => {
    await Api.delete(`api/certification/${certificationId}`);
    setCertificates((current) => {
      const newCertificates = [...current];
      return newCertificates.filter(
        (certificate) => certificate._id !== certificationId
      );
    });
  };

  return (
    <div className="mvp-container">
      <h3 className="mvp-title">Certificate</h3>
      {certificates.map((certificate) => (
        <Certificate
          key={certificate._id}
          certificate={certificate}
          setCertificates={setCertificates}
          isEditable={isEditable}
          onShowButtonClickEventHandler={onShowButtonClickEventHandler}
          setDeleteCertificationId={setDeleteCertificationId}
        />
      ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={{ span: 20 }}>
            <Button onClick={() => setIsAdding(true)}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && (
        <CertificateAddForm
          portfolioOwnerId={portfolioOwnerId}
          setCertificates={setCertificates}
          setIsAdding={setIsAdding}
        />
      )}
      {isShow && (
        <ConfirmModal
          msg="정말 삭제하시겠습니까?"
          isShow={isShow}
          onCloseButtonClickEvent={onCloseButtonClickEventHandler}
          onCheckButtonClickEvent={() => {
            handleDeleteButton(deleteCertificationId);
          }}
        />
      )}
    </div>
  );
}

export default CertificateContainer;
