import { Formik, isString } from 'formik';
import numberFormater from '../../../logic/numberFormater';
import { NumInput } from '../../NumInput';
import { validationSchemaLimit, validationSchemaMarket } from './validate';
import {
    ActionButton,
    PricesContainer,
    StyledForm,
    SwitchButton,
    ProcentsContainer,
    ModesContainer,
    Errors,
} from './FormActionstyles';
import React, { useEffect, useState } from 'react';
import { Fee, Precision, SelectedCoin } from '../../../@types/coin';

interface Props {
    selectedCoin: SelectedCoin | null;
    amountValue: number;
    limitValue: number;
    action: string;
    available: number;
    accuracy: {
        precision: { amount: number | undefined; price: number | undefined };
    };
    mode: string;
    fee: Fee;
    handleLimitChange: (value: string | number) => void;
    handleAction: (e: React.SyntheticEvent) => void;
    toggleAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleModeChange: (value: string) => void;
    handleAmountChange: (value: string | number) => void;
}

const FormAction = (actionObj: Props) => {
    const {
        selectedCoin,
        amountValue,
        handleAmountChange,
        limitValue,
        handleLimitChange,
        handleAction,
        toggleAction,
        action,
        available,
        accuracy,
        mode,
        handleModeChange,
        fee,
    } = actionObj;

    const defineCoin = () => {
        if (selectedCoin) {
            return action === 'buy' ? selectedCoin.limit : selectedCoin.amount;
        } else return null;
    };
    const defineVolume = () =>
        amountValue && limitValue ? +(amountValue * limitValue) : 0;

    const handleProcentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let amountResult: number = 0;
        const procent = +parseInt((e.target as HTMLElement).innerText) * 0.01;
        if (mode === 'limit') {
            if (limitValue) {
                if (procent === 1) {
                    const subFee = available * fee.maker;
                    amountResult = available / limitValue;
                    amountResult = amountResult - amountResult * fee.maker;
                } else {
                    amountResult = (procent * available) / limitValue;
                }
            } else amountResult = 0;
        } else if (mode === 'market') {
            if (procent === 1) {
                amountResult = available * procent;
                amountResult = amountResult - amountResult * fee.taker;
            } else {
                amountResult = available * procent;
            }
        }

        if (action === 'sell') {
            amountResult = procent * available;
        }

        handleAmountChange(amountResult.toFixed(accuracy.precision.amount));
    };

    const changeMode = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLParagraphElement;

        const elements = target?.parentElement && [
            ...target.parentElement.children,
        ];
        elements?.forEach(el =>
            el.classList.contains('chosed')
                ? el.classList.remove('chosed')
                : null,
        );
        target.classList.add('chosed');
        handleModeChange(target.innerText.toLowerCase());
    };

    return (
        <StyledForm onSubmit={handleAction}>
            <label className="switchContainer">
                <SwitchButton onClick={toggleAction}>
                    {action[0].toUpperCase() + action.substr(1)}
                </SwitchButton>
                <p>
                    {'<-'}Click
                    <br /> to switch mode
                </p>
            </label>
            <ModesContainer>
                <p onClick={changeMode} className={'chosed'}>
                    Limit
                </p>
                <p onClick={changeMode}>Market</p>
            </ModesContainer>
            <div className="inputsContainer">
                <NumInput
                    disabled={mode === 'market' ? true : false}
                    placeholder={'Limit'}
                    coin={selectedCoin as SelectedCoin}
                    hookValue={limitValue}
                    handleValue={handleLimitChange}
                    accuracy={
                        accuracy?.precision ? accuracy.precision.price : 8
                    }
                />
                <NumInput
                    placeholder={'Amount'}
                    coin={selectedCoin as SelectedCoin}
                    hookValue={amountValue}
                    handleValue={handleAmountChange}
                    accuracy={
                        accuracy?.precision ? accuracy.precision.amount : 8
                    }
                />
                <ProcentsContainer>
                    <button onClick={handleProcentClick}>25%</button>
                    <button onClick={handleProcentClick}>50%</button>
                    <button onClick={handleProcentClick}>75%</button>
                    <button onClick={handleProcentClick}>100%</button>
                </ProcentsContainer>
            </div>
            <PricesContainer>
                <div>
                    <p>Available:</p>
                    <p>
                        {`${numberFormater(available)} `}
                        {defineCoin()}
                    </p>
                </div>
                <div style={mode === 'market' ? { display: 'none' } : {}}>
                    <p>Volume:</p>
                    <p>
                        {numberFormater(defineVolume()) + ' '}
                        {selectedCoin ? selectedCoin.limit : null}
                    </p>
                </div>
            </PricesContainer>
            <ActionButton className={action} type="submit">
                {`${action[0].toUpperCase()}${action.substr(1)}`}
                {selectedCoin ? ' ' + selectedCoin.amount : null}
            </ActionButton>
        </StyledForm>
    );
};
export default FormAction;
