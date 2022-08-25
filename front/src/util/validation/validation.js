class Validation {
    // Check validation form

    // Award
    // award의 title과 description의 길이는 앞 뒤 공백 제거 기준 5글자 이상이어야 한다.
    static validateAwardTitle(title) {
        const checkTitle = title.trim();
        if (checkTitle.length < 5) return false;
        return true;
    }

    static validateAwardDetail(detail) {
        const checkDetail = detail.trim();
        if (checkDetail.length < 5) return false;
        return true;
    }
}

Object.freeze(Validation);
export default Validation;
