import useModal from "../../hooks/useModal";
import UserModal from "../modal/UserModal";
import AlertModal from "../modal/AlertModal";
import UserConfirmPassword from "./UserConfirmPassword";
import { Form } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import * as Api from "../../api";
import {
  varColors,
  varFontSize,
  varFontWeight,
  varLineHeight,
  varSpacing,
} from "../../util/theme/theme";

const UserEditForm2 = ({ user, setIsEditing, setUser }) => {
  const [values, isValid, handleChange] = useForm({
    name: user.name,
    email: user.email,
    description: user.description,
  });
  const [error, setError] = useState(false);

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

  const { name, email, description, all } = isValid;

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!all) {
      onShowButtonClickEventHandler();
      return;
    }
    try {
      const userObj = { ...values, id: user.id };
      const updatedUser = await fetchUpdateUserInformation.call(this, userObj);
      setUser({
        ...updatedUser.data,
        profileImageUrl:
          updatedUser.data.profileImageUrl ||
          `${process.env.PUBLIC_URL}/images/profile.PNG`,
      });
      setIsEditing(false);
    } catch (e) {
      setError(true);
    }
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
        {name || (
          <Form.Text className="text-danger">
            이름은 최소 2글자 이상이여야 합니다.
          </Form.Text>
        )}
        <input
          type="text"
          placeholder="Email..."
          style={inputStyle}
          value={values?.email}
          name="email"
          onChange={(e) => {
            handleChange(e, false);
            setError(false);
          }}
        />
        {email || (
          <Form.Text className="text-danger">
            이메일 형식에 맞지 않습니다.
          </Form.Text>
        )}
        {error && (
          <Form.Text className="text-danger">
            이미 사용중인 이메일입니다.
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
        {description || (
          <Form.Text className="text-danger">
            설명은 최소 1글자 이상 입력해주세요.
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
        msg="정보를 바르게 기입해주세요."
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
      />
      <UserModal
        isShow={isPasswordShow}
        onCloseButtonClickEvent={onPasswordCloseButtonClickEventHandler}
      >
        <UserConfirmPassword user={user} />
      </UserModal>
    </div>
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
  width: "100%",
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
