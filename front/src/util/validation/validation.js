class Validation {
    // Check validation form

    // Award
    // award의 title과 description의 길이는 앞 뒤 공백 제거 기준 5글자 이상이어야 한다.
    static validateAwardTitle(title) {
        const checkTitle = title.trim();
        if (checkTitle.length < 5) return false;
        return true;
    }

    static validateAwardDescription(description) {
        const checkDescription = description.trim();
        if (checkDescription.length < 5) return false;
        return true;
    }

    static validateDateInput(date) {
        const checkDate = date.split('-');
        if (checkDate.length !== 3) return false;
        return true;
    }
}

Object.freeze(Validation);
export default Validation;
