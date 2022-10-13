export interface SelectedCoin {
    limit: string;
    amount: string;
}

export interface Precision {
    amount: number;
    price: number;
}

export interface Fee {
    maker: number;
    taker: number;
}
