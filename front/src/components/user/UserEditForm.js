import useModal from "../../hooks/useModal";
import { Form } from "react-bootstrap";
import AlertModal from "../modal/AlertModal";
import { useForm } from "../../hooks/useForm";
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

  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
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
      ...updatedUser,
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
          type="email"
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
        <button style={buttonCancelStyle} onClick={handlerCancelClick}>
          CANCEL
        </button>
      </form>
      <AlertModal
        msg="Please check your information."
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
      />
    </div>
  );
};

async function fetchUpdateUserInformation(user) {
  const res = await Api.put(`users/${user.id}`, {
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
