import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
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
                        >삭제</Button>
                    </Col>
                )}
            </Row>
        </Card.Text>
    );
}

export default CertificateCard;