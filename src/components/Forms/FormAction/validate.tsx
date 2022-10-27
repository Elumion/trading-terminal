import * as yup from 'yup';

export const validationSchemaLimit = yup.object().shape({
    amount: yup.number().positive('POSITIVE').required(),
    limit: yup.number().positive('POSITIVE').required(),
});
export const validationSchemaMarket = yup.object().shape({
    amount: yup.number().positive('POSITIVE').required('REQUIRED'),
});

export const isNotValidFormAction = async (
    mode: string,
    amountValue: number,
    limitValue: number,
    handleValid: (value: string | boolean) => void,
) => {
    let output: false | string;
    if (mode === 'limit')
        await validationSchemaLimit
            .isValid({
                amount: amountValue,
                limit: limitValue,
            })
            .then(function (valid: boolean) {
                output = valid
                    ? false
                    : "Fields Amount and Limit can't be negative or empty!";
                handleValid(output);
            });
    else if (mode === 'market') {
        await validationSchemaMarket
            .isValid({
                amount: amountValue,
            })
            .then(function (valid: boolean) {
                output = valid
                    ? false
                    : "Field Amount can't be negative or empty!";
                handleValid(output);
            });
    }
};
