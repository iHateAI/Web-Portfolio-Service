import { Card, Button, Row, Col } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
    const [ 
        isShow,
        onShowButtonClickEventHandler,
        onCloseButtonClickEventHandler,
    ] = useModal(false)

    return (
        <Card.Text>
            <Row className="align-items-center">
                <Col>
                    <span>{certificate.title}</span>
                    <br />
                    <span className="text-muted">{certificate.detail}</span>
                    <br />
                    <span className="text-muted">{(certificate.certificationDate).split("T")[0]}</span>
                </Col>
                {isEditable && (
                    <Col xs="4" className="text-end">
                        <Button
                            className="me-3"
                            variant="outline-info"
                            size='sm'
                            onClick={() => setIsEditing(true)}
                        >편집</Button>
                        <Button
                            variant="danger"
                            size='sm'
                            onClick={onShowButtonClickEventHandler}
                        >삭제</Button>
                    </Col>
                )}
            </Row>
            { isShow && (
                <ConfirmModal
                    msg="정말 삭제하시겠습니까?"
                    isShow={isShow}
                    onCloseButtonClickEvent={onCloseButtonClickEventHandler}
                    onCheckButtonClickEvent={onCloseButtonClickEventHandler}
                />
            )}
            
        </Card.Text>
    );
}

export default CertificateCard;