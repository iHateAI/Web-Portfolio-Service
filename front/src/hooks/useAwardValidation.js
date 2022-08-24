import Validation from "../util/validation/validation"

const useAwardValidation = () => {
    const checkValidationTitle = (title) => {
        return Validation.validateAwardTitle(title)
    }

    const checkValidationDescription = (description) => {
        return Validation.validateAwardDescription(description)
    }

    const checkValidationAll = (title, description) => {
        return [title, description].every((v) => v === true)
    }

    return [
        checkValidationTitle,
        checkValidationDescription,
        checkValidationAll,
    ]
}

export default useAwardValidation
