export interface StoreInterface {
    balance: {
        data: {
            info: {
                code: string;
                data: {
                    [key: number]: {
                        id: string;
                        currency: string;
                        type: string;
                        balance: string;
                        available: string;
                        holds: string;
                    };
                };
            };
            used: {
                [key: string]: number;
            };
            total: {
                [key: string]: number;
            };
            free: {
                [key: string]: number;
            };
        } & {
            [key: string]: {
                free: number;
                used: number;
                total: number;
            };
        };
        status: string;
    };
    coins: {
        data: {
            id: string;
            symbol: string;
            base: string;
            quote: string;
            baseId: string;
            quoteId: string;
            type: string;
            spot: boolean;
            margin: boolean;
            swap: boolean;
            future: boolean;
            option: boolean;
            active: boolean;
            contract: boolean;
            precision: {
                amount: number;
                price: number;
            };
            limits: {
                leverage: any;

                amount: {
                    min: number;
                    max: number;
                };
                price: any;
                cost: {
                    min: number;
                    max: number;
                };
            };
            info: {
                symbol: string;
                name: string;
                baseCurrency: string;
                quoteCurrency: string;
                feeCurrency: string;
                market: string;
                baseMinSize: string;
                quoteMinSize: string;
                baseMaxSize: string;
                quoteMaxSize: string;
                baseIncrement: string;
                quoteIncrement: string;
                priceIncrement: string;
                priceLimitRate: string;
                isMarginEnabled: boolean;
                enableTrading: boolean;
            }[];
        };
        status: string;
    };
    selectedCoin: {
        data: {
            limit: string;
            amount: string;
        };
    };
    fee: {
        data: {
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
        };
        status: string;
    };
    orders: {
        data: {
            id: string;
            clientOrderId: string;
            symbol: string;
            type: string;
            timeInForce: string;
            postOnly: boolean;
            side: string;
            amount: number;
            price: number;
            stopPrice: number;
            cost: number;
            filled: number;
            remaining: number;
            timestamp: number;
            datetime: string;
            fee: {
                currency: string;
                cost: number;
            };
            status: string;
            info: {
                id: string;
                symbol: string;
                opType: string;
                type: string;
                side: string;
                price: string;
                size: string;
                funds: string;
                dealFunds: string;
                dealSize: string;
                fee: string;
                feeCurrency: string;
                stp: string;
                stop: string;
                stopPrice: string;
                timeInForce: string;
                postOnly: boolean;
                hiden: boolean;
                iceberg: boolean;
                visibleSize: string;
                cancelAfter: number;
                channel: string;
                clientOid: string;
                remark: null;
                tags: null;
                isActive: boolean;
                cancelExist: boolean;
                createdAt: Date;
                tradeType: string;
            };
            trades: any[];
            fees: {
                currency: string;
                cost: number;
            }[];
        }[];
        status: string;
    };
    exchanges: {
        data: Exchange[];
        status: string;
    };
    SelectedExchange: {
        data: any;
        name: string;
        id: string;
    };
}

export interface Exchange {
    id: string;
    exchange: string;
    name: string;
    apiKey: string;
    apiSecret: string;
    password: string;
    needPassword: true;
}
