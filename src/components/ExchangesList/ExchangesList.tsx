import { SavedExchange } from '../../@types/redux.types';
import { StyledLi, StyledUl } from './ExchangesList.style';

const ExchangesList = ({
    exchangesArray,
    editFunction,
}: {
    exchangesArray: SavedExchange[];
    editFunction: any;
}) => {
    const handleClick = (e: any) => {
        editFunction(e.currentTarget.dataset);
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
