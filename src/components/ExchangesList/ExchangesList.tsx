import { FormExchange, SavedExchange } from '../../@types/redux.types';
import { StyledLi, StyledUl } from './ExchangesList.style';

interface Props {
    exchangesArray: SavedExchange[];
    editFunction: (obj: FormExchange) => void;
}

const ExchangesList = ({ exchangesArray, editFunction }: Props) => {
    const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        if (isFormExchange(e.currentTarget.dataset)) {
            editFunction(e.currentTarget.dataset);
        }
    };

    const renderExchangesList = (arr: SavedExchange[]) =>
        arr?.map(el => (
            <StyledLi key={el.id}>
                <div>
                    <p>{el.name}</p>
                    <p>{el.exchange}</p>
                </div>
                <div>
                    <p>API key: {el.apiKey}</p>
                    <button
                        data-id={el.id}
                        data-name={el.name}
                        data-apikey={el.apiKey}
                        data-apisecret={el.apiSecret}
                        data-password={el.password}
                        onClick={handleClick}
                    >
                        Change
                    </button>
                </div>
            </StyledLi>
        ));

    return (
        <>
            <StyledUl className="scroll">
                {renderExchangesList(exchangesArray)}
            </StyledUl>
        </>
    );
};

export default ExchangesList;

function isFormExchange(value: any): value is FormExchange {
    if (value.apisecret && value.apikey) return true;
    else return false;
}
