import React from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';
import { useForm } from '../../hooks/useForm';

const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    return yyyy + '-' + mm + '-' + dd;
};

function CertificateAddForm({
    portfolioOwnerId,
    setCertificates,
    setIsAdding,
}) {
    const [values, isValid, handleChange] = useForm({
        title: '',
        detail: '',
        certificationDate: formatDate(new Date()),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid.all) return;
        const user_id = portfolioOwnerId;
        await Api.post('api/certification', {
            ...values,
        });

        const res = await Api.get('api/certification');
        setCertificates(res.data);
        setIsAdding(false);
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="certificateAddTitle">
                <Form.Control
                    type="text"
                    placeholder="자격증 제목"
                    name="title"
                    onChange={handleChange}
                />
                {!isValid.title && (
                    <Form.Text muted>2글자 이상 적어주세요</Form.Text>
                )}
            </Form.Group>
            <Form.Group controlId="certificateAddDetail" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    name="detail"
                    onChange={handleChange}
                />
                {!isValid.detail && (
                    <Form.Text muted>2글자 이상 적어주세요</Form.Text>
                )}
            </Form.Group>
            <Form.Group
                as={Row}
                controlId="certificateAddDate"
                className="mt-3"
            >
                <Col xs="auto">
                    <DatePicker
                        selected={new Date()}
                        onChange={(date) => {
                            handleChange(null, formatDate(date));
                        }}
                        name="certificationDate"
                        dateFormat="yyyy-MM-dd"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center mb-4">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setIsAdding(false)}
                    >
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default CertificateAddForm;
