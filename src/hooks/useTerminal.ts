import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreInterface } from '../@types/redux.types';
import { isNotValidFormAction } from '../components/Forms/FormAction/validate';
import { fetchBalance } from '../redux/balanceReducer';
import { fetchCoins } from '../redux/coinsReducer';
import { fetchOrders } from '../redux/ordersReducer';
import { RootState, useAppDispatch } from '../redux/store';

export const useTerminal = () => {
    let kucoin = useSelector((state: RootState) => state.SelectedExchange.data);

    const dispatch = useAppDispatch();
    let balance = useSelector((state: RootState) =>
        state.balance.data ? state.balance.data : null,
    );

    let coins = useSelector((state: RootState) =>
        state.coins.data ? state.coins.data : [],
    );

    let selectedCoin = useSelector((state: RootState) =>
        state.selectedCoin.data ? state.selectedCoin.data : null,
    );

    const [accuracy, setAccuracy] = useState({
        precision: { price: 11, amount: 11 },
    });

    const [amountValue, setAmountValue]: [any, any] = useState('');
    const [limitValue, setLimitValue]: [any, any] = useState('');

    const [available, setAvailable]: [any, any] = useState(0);
    const [valid, setValid]: [string | boolean, any] =
        useState('Please select coin');

    let fee = useSelector((state: RootState) =>
        state.fee.data ? state.fee.data : { maker: 0, taker: 0 },
    );

    let orders = useSelector((state: RootState) =>
        state.orders.data ? state.orders.data : [],
    );

    const [mode, setMode] = useState('limit');

    const [action, setAction] = useState<'buy' | 'sell'>('buy');

    useEffect(() => {
        dispatch(fetchBalance(kucoin));
        dispatch(fetchCoins(kucoin));
        dispatch(fetchOrders(kucoin));
    }, [kucoin]);

    useEffect(() => {
        const handleBalance = () => {
            let result: any;
            if (balance && selectedCoin) {
                let currency =
                    action === 'buy' ? selectedCoin.limit : selectedCoin.amount;
                if (balance[currency]) result = balance[currency].free;
            } else result = 0;

            setAvailable(result ? result : 0);
        };
        handleBalance();
    }, [action, balance, selectedCoin]);

    useEffect(() => {
        dispatch(fetchOrders(kucoin));
    }, [balance]);

    useEffect(() => {
        isNotValidFormAction(mode, amountValue, limitValue, setValid);
    }, [amountValue, limitValue, mode]);

    return {
        kucoin,
        dispatch,
        balance,
        coins,
        selectedCoin,
        accuracy,
        setAccuracy,
        amountValue,
        setAmountValue,
        limitValue,
        setLimitValue,
        available,
        setAvailable,
        valid,
        setValid,
        fee,
        orders,
        mode,
        setMode,
        action,
        setAction,
    };
};
