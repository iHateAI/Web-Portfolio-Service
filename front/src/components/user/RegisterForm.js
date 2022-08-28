import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import * as Api from "../../api";

function RegisterForm() {
  const navigate = useNavigate();
  const [values, isValid, handleChange] = useForm({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const isPasswordSame = values.password === values.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, name } = values;
      await Api.post("user/register", {
        email,
        password,
        name,
      });
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  return (
    <div className="regiser-container">
      <section className="section register-content">
        <div className="title-container">
          <h2 className="register-title">Register</h2>
          <p className="register-sub-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            necessitatibus incidunt ut officiis explicabo inventore.
          </p>
        </div>
        <Container>
          <Row className="justify-content-md-center mt-5">
            <Col lg={8}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>이메일 주소</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="off"
                    name="email"
                    onChange={handleChange}
                  />
                  {!isValid.email && (
                    <Form.Text className="text-danger">
                      이메일 형식이 올바르지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="off"
                    name="password"
                    onChange={handleChange}
                  />
                  {!isValid.password && (
                    <Form.Text className="text-danger">
                      비밀번호는 4글자 이상으로 설정해 주세요.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group
                  controlId="formBasicPasswordConfirm"
                  className="mt-3"
                >
                  <Form.Label>비밀번호 재확인</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="off"
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                  {!isPasswordSame && (
                    <Form.Text className="text-danger">
                      비밀번호가 일치하지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formBasicName" className="mt-3">
                  <Form.Label>이름</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    name="name"
                    onChange={handleChange}
                  />
                  {!isValid.name && (
                    <Form.Text className="text-danger">
                      이름은 2글자 이상으로 설정해 주세요.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!isValid.all || !isPasswordSame}
                    >
                      회원가입
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default RegisterForm;
