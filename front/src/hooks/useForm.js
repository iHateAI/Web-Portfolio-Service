import { useCallback, useEffect, useState } from 'react';
import testValidate from '../util/validation/testValidate';

export const useForm = (initialState) => {
    const [values, setValues] = useState(initialState);
    const [isValid, setIsValid] = useState({ all: false });

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setValues({ ...values, [name]: value });
        },
        [values]
    );

    useEffect(() => {
        setIsValid(testValidate(values));
    }, [values]);

    return [values, isValid, handleChange];
};
