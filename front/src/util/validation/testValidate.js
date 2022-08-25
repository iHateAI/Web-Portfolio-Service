const testValidate = (values) => {
    const result = { all: true };
    for (const [name, value] of Object.entries(values)) {
        if (name === '_id') continue;
        switch (name) {
            case 'title':
            case 'detail':
                result[name] = validateLength(value, 5);
                break;
            case 'university':
            case 'major':
                result[name] = validateLength(value, 4);
                break;
            case 'status':
            case 'description':
                result[name] = validateLength(value, 1);
                break;
            case 'startDate':
            case 'endDate':
            case 'certificationDate':
                result[name] = validateDate(value);
                break;
            case 'email':
                result[name] = validateEmail(value);
                break;
            case 'password':
                result[name] = validatePassword(value);
                break;
            default:
                break;
        }
        if (!result[name]) result.all = false;
    }
    return result;
};

const validateLength = (text, length) => {
    const checkLength = text.trim();
    if (checkLength.length < length) return false;
    return true;
};

const validateEmail = (email) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = (password) => {
    if (password.includes(' ')) return false;
    if (password.length < 5) return false;
    return password.match(/^[A-Za-z0-9]{6,12}$/);
    //비밀번호의 시작이 알파벳 혹은 숫자이며, 길이가 6~12자 이내여야함
};

const validateDate = (date) => {
    const checkDate = date.split('-');
    if (checkDate.length !== 3) return false;
    return true;
};

export default testValidate;
