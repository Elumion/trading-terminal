import { Balance, Balances, Exchange, Market, Order } from 'ccxt';

export interface StoreInterface {
    balance: {
        data: Balances;
        status: string;
    };
    coins: {
        data: Market[];

        status: string;
    };
    selectedCoin: {
        data: SelectedCoin;
    };
    fee: {
        data: ReduxFee;
        status: string;
    };
    orders: {
        data: Order[];
        status: string;
    };
    exchanges: {
        data: SavedExchange[];
        status: string;
    };
    SelectedExchange: {
        data: Exchange;
        name: string;
        id: string;
    };
}

export interface ReduxFee {
    info: {
        code: string;
    };
    data: {
        [key: number]: {
            symbol: string;
            takerFeeRate: string;
            makerFeeRate: string;
        };
    };
    symbol: string;
    maker: number;
    taker: number;
    percentage: boolean;
    tierBased: boolean;
}

export interface SavedExchange {
    id: string;
    exchange: string;
    name: string;
    apiKey: string;
    apiSecret: string;
    password: string;
    needPassword: boolean;
}

export type CustomBalance = {
    id: string;
    currency: string;
    type: string;
    balance: string;
    available: string;
    holds: string;
} & Balances;

export interface ReduxWrapper<T> {
    data: T;
    status: 'fulfilled' | 'rejected' | 'pending';
}

export interface GlobalExchange {
    ccxtName: string;
    name: string;
    img: string;
    needPassword: boolean;
}
export interface FormExchange {
    name: string;
    apiKey: string;
    apiSecret: string;
    password: string;
    apisecret?: string;
    apikey?: string;
    id?: string;
}

export interface SelectedCoin {
    limit: string;
    amount: string;
}
