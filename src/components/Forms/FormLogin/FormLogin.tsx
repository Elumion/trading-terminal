import { Exchange } from 'ccxt';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FormExchange, SavedExchange } from '../../../@types/redux.types';
import { fetchExchanges } from '../../../redux/exchangesReducer';
import { useAppDispatch } from '../../../redux/store';
import { CustomInput } from '../../CustomInput';
import { CustomSelect } from '../../CustomSelect';
import { FormContainer } from './FormLogin.styles';
import schema from './validationSchema';

const FormLogin = () => {
    const showErrors = (errorsObj: { [key: string]: string }) => {
        const error = Object.values(errorsObj)[0];
        toast.error(error);
    };
    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={{
                exchange: '',
                name: '',
                apiKey: '',
                apiSecret: '',
                password: '',
                needPassword: false,
            }}
            validationSchema={schema}
            onSubmit={async (values, { resetForm }) => {
                const ccxt = (window as any).ccxt;

                let newExchange: Exchange;
                if (values.needPassword) {
                    newExchange = new ccxt[values.exchange]({
                        apiKey: values.apiKey,
                        secret: values.apiSecret,
                        password: values.password,
                        proxy: window.Main.globalConfig.proxy,
                    });
                } else {
                    newExchange = new ccxt[values.exchange]({
                        apiKey: values.apiKey,
                        secret: values.apiSecret,
                        proxy: window.Main.globalConfig.proxy,
                    });
                }

                const generateUniqueId = () =>
                    Math.random().toString(16).slice(2);

                let exchangeIsAlive: boolean;

                // newExchange.setSandboxMode(true); //====================
                newExchange
                    .fetchBalance()
                    .then(res => (exchangeIsAlive = true))
                    .catch(res => {
                        exchangeIsAlive = false;
                        toast.error(res.message);
                    })
                    .then(() => {
                        if (exchangeIsAlive) {
                            window.Main.addExchange({
                                ...values,
                                id: generateUniqueId(),
                            });

                            resetForm({ values });
                            dispatch(fetchExchanges());
                            toast.success('Add exchange success!');
                        }
                    });
            }}
        >
            {({
                values,
                handleChange,
                handleSubmit,
                touched,
                errors,
                handleBlur,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                    <FormContainer>
                        <div>
                            <CustomSelect
                                handleChange={(
                                    value: string,
                                    needPassword: boolean,
                                ) => {
                                    setFieldValue('exchange', value);
                                    setFieldValue('needPassword', needPassword);
                                }}
                                value={values.exchange}
                            />
                        </div>
                        <div>
                            <CustomInput
                                label={'Name'}
                                handleChange={(value: string) => {
                                    setFieldValue('name', value);
                                }}
                                value={values.name}
                            />
                        </div>
                        <div>
                            <CustomInput
                                isPassword
                                label={'API Key'}
                                handleChange={(value: string) => {
                                    setFieldValue('apiKey', value);
                                }}
                                value={values.apiKey}
                            />
                        </div>
                        <div>
                            <CustomInput
                                isPassword
                                label={'API Secret'}
                                handleChange={(value: string) => {
                                    setFieldValue('apiSecret', value);
                                }}
                                value={values.apiSecret}
                            />
                        </div>
                        {values.needPassword && (
                            <div>
                                <CustomInput
                                    isPassword
                                    label={'API Password'}
                                    handleChange={(value: string) => {
                                        setFieldValue('password', value);
                                    }}
                                    value={values.password}
                                />
                            </div>
                        )}
                        <button
                            type={'submit'}
                            onClick={() => showErrors(errors)}
                        >
                            Submit
                        </button>
                    </FormContainer>
                </form>
            )}
        </Formik>
    );
};

export default FormLogin;
