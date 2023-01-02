import { Market } from 'ccxt';
import { isString } from 'formik';
import { stat } from 'fs';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isExchange } from '../../@typeguards/isExchange';
import { CoinsList } from '../../components/CoinsList';
import { FormAction } from '../../components/Forms/FormAction/';
import { isNotValidFormAction } from '../../components/Forms/FormAction/validate';
import { OrdersList } from '../../components/OrdersList';
import { useTerminal } from '../../hooks/useTerminal';
import { fetchBalance } from '../../redux/balanceReducer';
import { fetchCoins } from '../../redux/coinsReducer';
import { fetchFee } from '../../redux/feeReducer';
import { fetchOrders } from '../../redux/ordersReducer';
import { coinSelected } from '../../redux/selectCoinReducer';
import { store } from '../../redux/store';
import { TerminalContainer } from './Terminal.style';

const Terminal = () => {
    const ccxt = (window as any).ccxt;
    const {
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
    } = useTerminal();

    const handleModeChange = (value: string) => setMode(value);

    const handleAmountChange = (value: string | number) => {
        setAmountValue(+value);
    };
    const handleLimitChange = (value: string | number) => {
        setLimitValue(+value);
    };

    const handleClick = (value: string) => {
        const splittedValue = value.split('/');
        dispatch(coinSelected(value));
        if (isExchange(kucoin))
            dispatch(fetchFee({ exchange: kucoin, coinName: value }));
        let accuracy: Market;
        for (let key of coins) {
            if (key.symbol === value) {
                accuracy = key;
                setAccuracy(accuracy);
                break;
            }
        }
    };

    const changeAction = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        e.preventDefault();
        setAction(target.innerText.toLocaleLowerCase() as 'sell' | 'buy');
    };

    const handleAction = (e: React.SyntheticEvent) => {
        //When mode market data doesn't fetch, need to fix imidiately
        e.preventDefault();
        isNotValidFormAction(mode, +amountValue, +limitValue, setValid);
        if (!selectedCoin) return toast.error('Please select coin!');
        if (isString(valid)) return toast.error(valid);
        // if (isExchange(kucoin)) kucoin.setSandboxMode(true); //=========================
        const actionCoin: string = `${selectedCoin.amount}/${selectedCoin.limit}`;
        const limitUpMode = mode === 'limit' ? limitValue : '';
        if (isExchange(kucoin)) {
            kucoin
                .createOrder(
                    actionCoin,
                    mode,
                    action,
                    +amountValue,
                    +limitUpMode,
                )
                .then(data => {
                    dispatch(fetchBalance(kucoin));
                    toast.success('Success!');
                }) // fullified => fetchOrders
                .catch(res => {
                    toast.error(res.message);
                });
        }
    };

    const cancelOrder = (orderId: string, symbol: string) => {
        // kucoin.setSandboxMode(true); //=========================
        if (isExchange(kucoin))
            kucoin.cancelOrder(orderId, symbol).then(res => {
                dispatch(fetchBalance(kucoin));
                dispatch(fetchOrders(kucoin));
            });
    };

    return (
        <TerminalContainer>
            <CoinsList coins={coins} selectCoin={handleClick} />
            <FormAction
                selectedCoin={selectedCoin}
                amountValue={amountValue}
                handleAmountChange={handleAmountChange}
                limitValue={limitValue}
                handleLimitChange={handleLimitChange}
                handleAction={handleAction}
                changeAction={changeAction}
                action={action}
                available={available}
                accuracy={accuracy}
                mode={mode}
                handleModeChange={handleModeChange}
                fee={fee}
            />
            <OrdersList ordersArray={orders} cancelFunction={cancelOrder} />
        </TerminalContainer>
    );
};
export default Terminal;
