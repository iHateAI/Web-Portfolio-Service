import { useState, useCallback } from "react";
import useModal from "../../hooks/useModal";
import useUserValidation from "../../hooks/useUserValidation";
import { Form } from "react-bootstrap";
import AlertModal from "../modal/AlertModal";
import * as Api from "../../api";
import {
    varColors,
    varFontSize,
    varFontWeight,
    varLineHeight,
    varSpacing,
} from "../../util/theme/theme";

const UserEditForm2 = ({ user, setIsEditing, setUser }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [description, setDescription] = useState(user.description);
    const [imagePreview, setImagePreview] = useState(user.profileUrl);
    const [uploadedImg, setUploadedImg] = useState(null);

    const [
        isShow,
        onShowButtonClickEventHandler,
        onCloseButtonClickEventHandler,
    ] = useModal(false);
    const [checkValidationEmail, _, checkValidationDescription] =
        useUserValidation();

    const isValidEmail = checkValidationEmail(email);
    const isValidDescription = checkValidationDescription(description);
    const isValid = isValidEmail && isValidDescription;

    const acceptedFile = ["image/jpg", "image/png", "image/jpeg"];

    const hanlderNameChange = useCallback((e) => {
        setName(e.target.value);
    }, []);

    const handlerEmailChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const handlerDescriptionChange = useCallback((e) => {
        setDescription(e.target.value);
    }, []);

    const handlerImageUpload = (e) => {
        setUploadedImg(e.target.files[0]);
        const preview = new FileReader();
        preview.readAsDataURL(e.target.files[0]);
        preview.onload = () => {
            setImagePreview(preview.result);
        };
    };

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        if (!isValid) {
            onShowButtonClickEventHandler();
            return;
        }
        if (!uploadedImg) {
            const res = await Api.put(`users/${user.id}`, {
                name,
                email,
                description,
            });
            const updatedUser = res.data;
            setUser({
                ...updatedUser,
                profileUrl: user?.profileUrl,
            });
        } else {
            const formData = new FormData();
            formData.append("image", uploadedImg);
            const res = await Api.imageUpload(`users/${user.id}`, formData);
            const updatedUser = res.data;
            console.log(updatedUser);
            setUser(updatedUser);
        }
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
                    value={name}
                    onChange={hanlderNameChange}
                />
                <input
                    type="email"
                    placeholder="Email..."
                    style={inputStyle}
                    value={email}
                    onChange={handlerEmailChange}
                />
                {!isValidEmail && (
                    <Form.Text className="text-danger">
                        Please check your email.
                    </Form.Text>
                )}
                <input
                    type="text"
                    placeholder="Description..."
                    style={inputStyle}
                    value={description}
                    onChange={handlerDescriptionChange}
                />
                {!isValidDescription && (
                    <Form.Text className="text-danger">
                        Please check your description.
                    </Form.Text>
                )}
                <label htmlFor="image-input" style={imageLabelStyle}>
                    Image upload
                </label>
                <input
                    type="file"
                    id="image-input"
                    accept={acceptedFile.join(", ")}
                    name="image"
                    style={imageInputStyle}
                    onChange={handlerImageUpload}
                />
                {imagePreview && (
                    <div style={previewWrapperStyle}>
                        <img
                            style={previewStyle}
                            src={imagePreview}
                            alt="profile-image"
                        />{" "}
                    </div>
                )}
                <button
                    type="submit"
                    style={buttonStyle}
                    onClick={handleSubmitClick}
                >
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

const imageLabelStyle = {
    width: "100%",
    backgroundColor: varColors.light.coolLightGray,
    color: varColors.light.coolBlack,
    border: "0px",
    borderRadius: "4px",
    marginBottom: "10px",
    padding: varSpacing.bp1024(1),
    cursor: "pointer",
};

const imageInputStyle = {
    display: "none",
};

const previewWrapperStyle = {
    textAlign: "center",
};

const previewStyle = {
    width: "30%",
    height: "30%",
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
