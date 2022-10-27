import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BalancesList } from '../../components/BalancesList.tsx';
import { fetchBalance } from '../../redux/balanceReducer';
import { RootState, useAppDispatch } from '../../redux/store';

const Balances = () => {
    const dispatch = useAppDispatch();
    const balances = useSelector((state: RootState) => state.balance);
    const exchange = useSelector(
        (state: RootState) => state.SelectedExchange.data,
    );
    const [isValidToRender, setIsValidToRender] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchBalance(exchange));
    }, []);
    useEffect(() => {
        dispatch(fetchBalance(exchange));
    }, [exchange]);

    useEffect(() => {
        balances.status === 'fulfilled'
            ? setIsValidToRender(true)
            : setIsValidToRender(false);
    }, [balances.status]);

    return (
        <>
            <BalancesList
                balancesArray={isValidToRender ? balances.data?.info.data : []}
            />
        </>
    );
};

export default Balances;
