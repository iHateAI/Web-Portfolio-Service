import useModal from "../../hooks/useModal";
import UserModal from "../modal/UserModal";
import { Form } from "react-bootstrap";
import AlertModal from "../modal/AlertModal";
import { useForm } from "../../hooks/useForm";
import { useState, useContext } from "react";
import * as Api from "../../api";
import {
  varColors,
  varFontSize,
  varFontWeight,
  varLineHeight,
  varSpacing,
} from "../../util/theme/theme";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../App";

const UserEditForm2 = ({ user, setIsEditing, setUser }) => {
  const [values, isValid, handleChange] = useForm({
    name: user.name,
    email: user.email,
    description: user.description,
  });

  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  const [
    isPasswordShow,
    onPasswordShowButtonClickEventHandler,
    onPasswordCloseButtonClickEventHandler,
  ] = useModal(false);

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!isValid) {
      onShowButtonClickEventHandler();
      return;
    }
    const userObj = { ...values, id: user.id };
    const updatedUser = await fetchUpdateUserInformation.call(this, userObj);
    setUser({
      ...updatedUser.data,
      profileImageUrl:
        updatedUser.data.profileImageUrl ||
        `${process.env.PUBLIC_URL}/images/profile.PNG`,
    });
    setIsEditing(false);
  };

  const handlerCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle}>
        <div style={titleStyle}>EDIT USER INFORMATION</div>
        <input
          type="text"
          placeholder="Name..."
          style={inputStyle}
          value={values?.name}
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email..."
          style={inputStyle}
          value={values?.email}
          name="email"
          onChange={handleChange}
        />
        {!isValid.email && (
          <Form.Text className="text-danger">
            Please check your email.
          </Form.Text>
        )}
        <input
          type="text"
          placeholder="Description..."
          style={inputStyle}
          value={values?.description}
          name="description"
          onChange={handleChange}
        />
        {!isValid.description && (
          <Form.Text className="text-danger">
            Please check your description.
          </Form.Text>
        )}
        <button type="submit" style={buttonStyle} onClick={handleSubmitClick}>
          CONFIRM
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={onPasswordShowButtonClickEventHandler}
        >
          비밀번호 변경하기
        </button>
        <button style={buttonCancelStyle} onClick={handlerCancelClick}>
          CANCEL
        </button>
      </form>
      <AlertModal
        msg="Please check your information."
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
      />
      <UserModal
        isShow={isPasswordShow}
        onCloseButtonClickEvent={onPasswordCloseButtonClickEventHandler}
      >
        <ConfirmPassword user={user} />
      </UserModal>
    </div>
  );
};

const ConfirmPassword = ({ user }) => {
  const [values, isValid, handleChange] = useForm({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const isPasswordSame = values.password === values.confirmPassword;

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    Api.put(`api/users/password/${user.id}`, {
      currentPassword: values.currentPassword,
      newPassword: values.password,
    })
      .catch(setErrorMsg("비밀번호가 일치하지 않습니다."))
      .then(() => {
        sessionStorage.removeItem("userToken");
        dispatch({ type: "LOGOUT" });
        navigate("/");
      });
  };

  return (
    <form style={formStyle} onSubmit={handleSubmitClick}>
      <div style={titleStyle}>Change Password</div>
      <div>
        <label>기존 비밀번호</label>
        <input
          type="password"
          name="currentPassword"
          style={inputStyle}
          onChange={handleChange}
        />
        {errorMsg && <Form.Text className="text-danger">{errorMsg}</Form.Text>}
      </div>
      <div>
        <label>변경할 비밀번호</label>
        <input
          type="password"
          name="password"
          style={inputStyle}
          onChange={handleChange}
        />
        {!isValid.password && (
          <Form.Text className="text-danger">
            비밀번호는 4글자 이상, 12글자 이하여야 합니다
          </Form.Text>
        )}
      </div>
      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          style={inputStyle}
          onChange={handleChange}
        />
        {!isPasswordSame && (
          <Form.Text className="text-danger">
            비밀번호가 일치하지 않습니다.
          </Form.Text>
        )}
      </div>
      <button type="submit" style={buttonStyle}>
        CONFIRM
      </button>
    </form>
  );
};

async function fetchUpdateUserInformation(user) {
  const res = await Api.put(`api/users/${user.id}`, {
    name: user.name,
    email: user.email,
    description: user.description,
  });
  return res.data;
}

const containerStyle = {
  width: "100%",
};

const titleStyle = {
  fontSize: varFontSize.bp1024(5),
  lineHeight: varLineHeight.bp1024(8),
  fontWeight: varFontWeight.bold,
  textAlign: "center",
  marginBottom: "10px",
};

const formStyle = {
  margin: "auto",
  color: varColors.light.coolBlack,
  fontFamily: "system-ui",
};

const inputStyle = {
  backgroundColor: varColors.light.coolWhiteGray,
  width: "100%",
  height: varSpacing.bp1024(5),
  outline: "none",
  border: "0px",
  fontSize: varFontSize.bp1024(4),
  lineHeight: varLineHeight.bp1024(4),
  padding: varSpacing.bp1024(1),
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: varColors.light.coolLightGray,
  },
  marginBottom: "10px",
};

const buttonStyle = {
  width: "100%",
  backgroundColor: varColors.light.lightSky,
  color: varColors.light.white,
  border: "0px",
  borderRadius: "4px",
  marginBottom: "10px",
  padding: varSpacing.bp1024(1),
};

const buttonCancelStyle = {
  width: "100%",
  backgroundColor: varColors.light.sky,
  color: varColors.light.white,
  border: "0px",
  borderRadius: "4px",
  padding: varSpacing.bp1024(1),
};

export default UserEditForm2;
