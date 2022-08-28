import { Card } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  return (
    <div className="mvp-content-detail">
      <div className="mvp-info">
        <h3 className="title">{certificate.title}</h3>
        <p className="sub-title">{certificate.detail}</p>
        <p className="sub-title">
          {certificate.certificationDate.split("T")[0]}
        </p>
      </div>
      {isEditable && (
        <div className="mvp-management">
          <button
            className="mvp-edit-button"
            onClick={() => setIsEditing(true)}
          >
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
      {isShow && (
        <ConfirmModal
          msg="정말 삭제하시겠습니까?"
          isShow={isShow}
          onCloseButtonClickEvent={onCloseButtonClickEventHandler}
          onCheckButtonClickEvent={onCloseButtonClickEventHandler}
        />
      )}
    </div>
  );
}

export default CertificateCard;
