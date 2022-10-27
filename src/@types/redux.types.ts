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

// COINS
// {
//     id: string;
//     symbol: string;
//     base: string;
//     quote: string;
//     baseId: string;
//     quoteId: string;
//     type: string;
//     spot: boolean;
//     margin: boolean;
//     swap: boolean;
//     future: boolean;
//     option: boolean;
//     active: boolean;
//     contract: boolean;
//     precision: {
//         amount: number;
//         price: number;
//     };
//     limits: {
//         leverage: any;

//         amount: {
//             min: number;
//             max: number;
//         };
//         price: any;
//         cost: {
//             min: number;
//             max: number;
//         };
//     };
//     info: {
//         symbol: string;
//         name: string;
//         baseCurrency: string;
//         quoteCurrency: string;
//         feeCurrency: string;
//         market: string;
//         baseMinSize: string;
//         quoteMinSize: string;
//         baseMaxSize: string;
//         quoteMaxSize: string;
//         baseIncrement: string;
//         quoteIncrement: string;
//         priceIncrement: string;
//         priceLimitRate: string;
//         isMarginEnabled: boolean;
//         enableTrading: boolean;
//     }[];
// };
