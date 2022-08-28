import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';

import * as Api from '../../api';
import { DispatchContext } from '../../App';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const [values, isValid, handleChange] = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post('user/login', { ...values });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem('userToken', jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate('/', { replace: true });
    } catch (err) {
      console.log('로그인에 실패하였습니다.\n', err);
    }
  };

  return (
    <div className="login-container">
      <section className="section login-content">
        <div className="title-container">
          <h2 className="login-title">Login</h2>
          <p className="login-sub-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            necessitatibus incidunt ut officiis explicabo inventore.
          </p>
        </div>
        <Container>
          <Row className="justify-content-md-center mt-5">
            <Col lg={8}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Adress</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="on"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                  />
                  {!isValid.email && (
                    <Form.Text className="text-success">
                      이메일 형식이 올바르지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="on"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                  />
                  {!isValid.password && (
                    <Form.Text className="text-success">
                      비밀번호는 4글자 이상입니다.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!isValid.all}
                    >
                      로그인
                    </Button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      variant="light"
                      onClick={() => navigate('/register')}
                    >
                      회원가입하기
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

export default LoginForm;
