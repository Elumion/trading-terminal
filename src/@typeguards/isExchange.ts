import { Exchange } from 'ccxt';

export function isExchange(value: any): value is Exchange {
    if (value.createOrder) return true;
    else return false;
}
