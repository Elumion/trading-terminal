import { Exchange } from 'ccxt';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isExchange } from '../../../@typeguards/isExchange';
import { fetchBalance } from '../../../redux/balanceReducer';
import { fetchCoins } from '../../../redux/coinsReducer';
import { fetchExchanges } from '../../../redux/exchangesReducer';
import { fetchOrders } from '../../../redux/ordersReducer';
import { RootState, useAppDispatch } from '../../../redux/store';
import { Reload } from './ReloadBtn.styles';

const ReloadBtn = memo(() => {
    const ccxt = (window as any).ccxt;
    let kucoin = useSelector((state: RootState) => state.SelectedExchange.data);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const reloadBtnRef = useRef(null);
    const dispatch = useAppDispatch();
    const handleReload = async () => {
        if (!isExchange(kucoin)) return;
        setIsLoading(true);
        await dispatch(fetchCoins(kucoin));
        await dispatch(fetchBalance(kucoin));
        await dispatch(fetchOrders(kucoin));
        await dispatch(fetchExchanges());
        setIsLoading(false);
    };

    useEffect(() => {
        if (!reloadBtnRef) return;
        const btn = reloadBtnRef.current as unknown as HTMLButtonElement;
        btn.classList.toggle('loading');
    }, [isLoading]);

    const reloadOrders = async (exchange: Exchange) => {
        if (isExchange(kucoin)) dispatch(fetchOrders(kucoin));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isExchange(kucoin)) reloadOrders(kucoin);
        }, 120000);
        return () => clearInterval(intervalId);
    }, [kucoin]);

    return (
        <Reload onClick={handleReload} ref={reloadBtnRef} className={'loading'}>
            <svg
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
            >
                <path
                    fill="none"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    d="M22.1,23.4C20.2,25,17.7,26,15,26C8.9,26,4,21.1,4,15 M7.9,6.6C9.8,5,12.3,4,15,4c6.1,0,11,4.9,11,11"
                />
                <path d="M26,20l-4-6h8L26,20z" />
                <polygon points="0.3,15 8.3,15 4.3,9" />
            </svg>
        </Reload>
    );
});
export default ReloadBtn;
