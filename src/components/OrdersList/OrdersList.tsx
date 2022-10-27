import { Order } from 'ccxt';
import { OrdersContainer, OrdersItem } from './OrdersList.styles';

type LiteralDateOption = 'numeric' | '2-digit' | undefined;
type LiteralHourOption = 'h24' | 'h11' | 'h12' | 'h23' | undefined;
interface OptionsDate {
    year: LiteralDateOption;
    month: LiteralDateOption;
    day: LiteralDateOption;
    hour: LiteralDateOption;
    minute: LiteralDateOption;
    second: LiteralDateOption;
    hourCycle: LiteralHourOption;
}

interface Props {
    ordersArray: Order[];
    cancelFunction: (orderId: string, symbol: string) => void;
}

const OrdersList = ({ ordersArray, cancelFunction }: Props) => {
    const renderDate = (date: string) => {
        const newDate = new Date(date);
        const options: OptionsDate = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
            second: 'numeric',
            hourCycle: 'h24',
        };
        return newDate.toLocaleString('en-US', options).toString();
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const key = (e.target as HTMLButtonElement).parentElement?.dataset.key;
        const symbol = (e.target as HTMLButtonElement).parentElement?.dataset
            .sybmol;
        cancelFunction(`${key}`, `${symbol}`);
    };

    const renderOrders = () =>
        ordersArray.map(elem => {
            const splittedSymbol = elem.symbol.split('/');

            return (
                <OrdersItem
                    key={elem.id}
                    data-key={elem.id}
                    data-sybmol={elem.symbol}
                >
                    <p>{renderDate(elem.datetime)}</p>
                    <p>{elem.symbol}</p>
                    <p>{elem.type}</p>
                    <p>{elem.side}</p>
                    <p>
                        {elem.price} {splittedSymbol[1]}
                    </p>
                    <p>
                        {elem.amount} {splittedSymbol[0]}
                    </p>
                    <p>
                        {elem.filled} {splittedSymbol[0]}
                    </p>
                    <p>
                        {elem.remaining} {splittedSymbol[0]}
                    </p>
                    <button onClick={handleClick}>Cancel</button>
                </OrdersItem>
            );
        });

    return (
        <OrdersContainer style={{ width: '100%' }}>
            <div>
                <p>Time</p>
                <p>Pair</p>
                <p>Type</p>
                <p>Buy/Sell</p>
                <p>Price</p>
                <p>Amount</p>
                <p>Filled</p>
                <p>Unfilled</p>
                <p>-</p>
            </div>
            <ul className="scroll">{renderOrders()}</ul>
        </OrdersContainer>
    );
};
export default OrdersList;
