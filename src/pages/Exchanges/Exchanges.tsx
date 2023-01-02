import { useDispatch, useSelector } from 'react-redux';
import { ExchangesList } from '../../components/ExchangesList';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { CustomInput } from '../../components/CustomInput';
import { fetchExchanges } from '../../redux/exchangesReducer';
import { StyledBtn, DeleteBtn } from './Exchanges.styles';
import { toast } from 'react-toastify';
import {
    exchangeSelected,
    resetSelectedExchange,
} from '../../redux/selectedExchangeReducer';
import { RootState, useAppDispatch } from '../../redux/store';
import { Exchange } from 'ccxt';
import { FormExchange, SavedExchange } from '../../@types/redux.types';

const Exchanges = () => {
    const exchanges = useSelector((state: RootState) => state.exchanges.data);
    const selectedId = useSelector(
        (state: RootState) => state.SelectedExchange.id,
    );
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchExchanges());
    }, [open]);

    const [editObj, setEditObj] = useState<FormExchange>({
        name: '',
        apiKey: '',
        apiSecret: '',
        password: '',
    });

    const handleEdit = (obj: FormExchange) => {
        handleOpen();
        setEditObj(obj);
    };

    const handleObjChange = (value: string, objName: string) => {
        setEditObj({ ...editObj, [objName]: value });
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: '#212121',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '18px 18px 5px 5px',
        padding: '40px 40px 100px',
    };

    const handleSubmit = () => {
        const editingExchange = exchanges?.filter(
            el => el.id === editObj.id,
        )[0];

        const validateExchange = {
            ...editingExchange,
            ...editObj,
            apiKey: editObj.apikey,
            apiSecret: editObj.apisecret,
        };
        let newExchange: Exchange;
        const ccxt = (window as any).ccxt;
        if (validateExchange.needPassword) {
            newExchange = new ccxt[`${validateExchange.exchange}`]({
                apiKey: validateExchange.apiKey,
                secret: validateExchange.apiSecret,
                password: validateExchange.password,
                proxy: window.Main.globalConfig.proxy,
            });
        } else {
            newExchange = new ccxt[`${validateExchange.exchange}`]({
                apiKey: validateExchange.apiKey,
                apiSecret: validateExchange.apiSecret,
                proxy: window.Main.globalConfig.proxy,
            });
        }
        // newExchange.setSandboxMode(true); //==============================
        newExchange
            .fetchBalance()
            .then(data => {
                window.Main.editExchange(validateExchange as SavedExchange);
                setOpen(false);
                toast.success('Exchange changed!');
            })
            .then(data => dispatch(exchangeSelected(newExchange)))
            .catch((err: Error) => toast.error(err.message));
    };

    const handleDelete = () => {
        window.Main.deleteExchange({ id: editObj.id as string });
        if (selectedId === editObj.id) {
            dispatch(resetSelectedExchange());
        }
        dispatch(fetchExchanges());
        setOpen(false);
        toast.success('Exchange Deleted!');
    };

    return (
        <>
            <ExchangesList
                exchangesArray={exchanges}
                editFunction={handleEdit}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CustomInput
                        handleChange={(value: string) => {
                            handleObjChange(value, 'name');
                        }}
                        label={'Name'}
                        value={editObj.name}
                    />
                    <CustomInput
                        handleChange={(value: string) => {
                            handleObjChange(value, 'apikey');
                        }}
                        label={'API Key'}
                        value={editObj.apikey as string}
                    />
                    <CustomInput
                        handleChange={(value: string) => {
                            handleObjChange(value, 'apisecret');
                        }}
                        label={'API Secret'}
                        value={editObj.apisecret as string}
                    />
                    {editObj.password && (
                        <CustomInput
                            handleChange={(value: string) => {
                                handleObjChange(value, 'password');
                            }}
                            label={'Password'}
                            value={editObj.password}
                        />
                    )}
                    <div
                        style={{ width: 'fit-content', margin: '30px auto 0' }}
                    >
                        <StyledBtn onClick={handleSubmit}>Submit</StyledBtn>
                    </div>
                    <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
                </Box>
            </Modal>
        </>
    );
};
export default Exchanges;
