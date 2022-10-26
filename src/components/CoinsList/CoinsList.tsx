import { ReactNode, useEffect, useState } from 'react';
import {
    StyledCoinsItem,
    StyledCoinsList,
    ListContainer,
    InputContainer,
} from './CoinsList.styles';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Market } from 'ccxt';

interface Props {
    coins: Market[];
    selectCoin: (value: string) => void;
}

const CoinsList = ({ coins, selectCoin }: Props) => {
    const [filteredCoins, setFilteredCoins] = useState(coins);

    const renderCoins = (arr: Market[]): ReactNode =>
        arr?.map(elem => (
            <StyledCoinsItem key={elem.id}>{elem.symbol}</StyledCoinsItem>
        ));

    const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
        selectCoin((e.target as HTMLUListElement).innerText);
    };

    const handleFilter = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        let newArray = coins.filter((el: { symbol: string }) =>
            el.symbol.startsWith(e.target.value.toUpperCase()),
        );
        setFilteredCoins(newArray);
    };

    useEffect(() => {
        setFilteredCoins(coins);
    }, [coins]);

    return (
        <ListContainer>
            <InputContainer>
                <Box>
                    <TextField
                        onChange={handleFilter}
                        label="Enter coin name"
                    />
                </Box>
            </InputContainer>

            <StyledCoinsList className="scroll" onClick={handleClick}>
                {renderCoins(filteredCoins)}
            </StyledCoinsList>
        </ListContainer>
    );
};
export default CoinsList;
