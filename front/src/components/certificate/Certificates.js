import React, { useState, useEffect }  from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import * as Db from "./db";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
    const [certificates, setCertificates] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    // test를 위한 설정
    isEditable = true

    useEffect(() => {
        // Api.get("certificates", portfolioOwnerId).then(res => setCertificates(res.data))

        // get test
        const res = Db.get(1);
        console.log(res.data)
        setCertificates(res.data)
    }, [portfolioOwnerId]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.map(certificate => (
                    <Certificate
                        key={certificate.id}
                        certificate={certificate}
                        setCertificates={setCertificates}
                        isEditable={isEditable}
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
            </Card.Body>
        </Card>
    );
}

export default Certificates;