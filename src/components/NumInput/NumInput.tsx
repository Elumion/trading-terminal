import { useEffect, useState } from 'react';
import { SelectedCoin } from '../../@types/redux.types';
import {
    StyledInput,
    InputContainer,
    OperationsContainer,
} from './NumInput.styles';

interface Props {
    placeholder: string;
    coin: SelectedCoin | {};
    hookValue: number | string;
    accuracy: number | undefined;
    disabled?: boolean;
    handleValue: (value: string | number) => void;
}

const NumInput = ({
    placeholder,
    coin,
    handleValue,
    hookValue,
    accuracy,
    disabled = false,
}: Props) => {
    const [localValue, setLocalValue] = useState<string | number>('');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const action = (e.target as HTMLButtonElement).innerText;
        if (action === '+') {
            if (localValue === '') setLocalValue(0.1);
            else if (isNaN(+localValue)) return;
            else if (!isNaN(+localValue)) setLocalValue(+localValue + 0.1);
        }
        if (action === '-') {
            if (localValue === '') setLocalValue(0.1);
            else if (isNaN(+localValue)) return;
            else if (!isNaN(+localValue)) setLocalValue(+localValue - 0.1);
        }
    };

    useEffect(() => {
        if (isNaN(+localValue))
            handleValue(+(hookValue as number).toFixed(accuracy));
        else if (!isNaN(+localValue))
            handleValue((+localValue).toFixed(accuracy));
    }, [localValue]);

    useEffect(() => {
        setLocalValue(hookValue);
    }, [hookValue]);

    return (
        <InputContainer>
            <StyledInput
                autoComplete="off"
                disabled={disabled}
                className={disabled ? 'disabled' : ''}
                name={placeholder.toLowerCase()}
                lang="en"
                id={`${placeholder}`}
                type={'text'}
                placeholder={placeholder}
                value={disabled ? '' : localValue}
                onChange={e => {
                    let subValue = e.target.value;
                    setLocalValue(subValue);
                }}
            />
            <OperationsContainer>
                <label htmlFor={`${placeholder}`}>
                    <p>
                        {isSelectedCoin(coin)
                            ? coin[
                                  placeholder.toLowerCase() as
                                      | 'limit'
                                      | 'amount'
                              ]
                            : null}
                    </p>
                </label>
                <div>
                    <button
                        className={disabled ? 'disabled' : ''}
                        onClick={handleClick}
                    >
                        +
                    </button>
                    <button
                        className={disabled ? 'disabled' : ''}
                        onClick={handleClick}
                    >
                        -
                    </button>
                </div>
            </OperationsContainer>
        </InputContainer>
    );
};
export default NumInput;

function isSelectedCoin(value: SelectedCoin | {}): value is SelectedCoin {
    if ((value as SelectedCoin).amount) return true;
    else return false;
}
