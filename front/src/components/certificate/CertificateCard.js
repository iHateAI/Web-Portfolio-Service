function CertificateCard({
  certificate,
  isEditable,
  setIsEditing,
  onShowButtonClickEventHandler,
  setDeleteCertificationId,
}) {
  const {
    _id: certificationId,
    title,
    detail,
    certificationDate,
  } = certificate;
  return (
    <div className="mvp-content-detail">
      <div className="mvp-info">
        <h3 className="title">{title}</h3>
        <p className="sub-title">{detail}</p>
        <p className="sub-title">{certificationDate.split("T")[0]}</p>
      </div>
      {isEditable && (
        <div className="mvp-management">
          <button
            className="mvp-edit-button"
            onClick={() => setIsEditing(true)}
          >
            EDIT
          </button>
          <button
            className="mvp-delete-button"
            onClick={() => {
              setDeleteCertificationId(certificationId);
              onShowButtonClickEventHandler();
            }}
          >
            DELETE
          </button>
        </div>
      )}
    </div>
  );
}

export default CertificateCard;
