import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchanges } from '../../../redux/exchangesReducer';
import { exchangeSelected } from '../../../redux/selectedExchangeReducer';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { borderColor } from '@mui/system';
import { RootState, useAppDispatch } from '../../../redux/store';
import { SavedExchange } from '../../../@types/redux.types';

const SelectExchange = () => {
    const dispatch = useAppDispatch();
    const exchanges = useSelector(
        (state: RootState) => state.exchanges.data || [],
    );
    const lastExchange: { id: string; name: string } = JSON.parse(
        window.localStorage.getItem('lastExchange') as string,
    );

    const [selected, setSelected] = useState<{ id: string; name: string }>(
        lastExchange || {
            name: '',
            id: '',
        },
    );

    useEffect(() => {
        dispatch(fetchExchanges()).then(data => {
            const exchange = (data.payload as SavedExchange[]).filter(
                (elem: any) => elem.id === selected.id,
            );
            if (exchange[0]) {
                dispatch(exchangeSelected(exchange[0]));
            } else {
                setSelected({ name: '', id: '' });
            }
        });
    }, []);

    useEffect(
        () =>
            window.localStorage.setItem(
                'lastExchange',
                JSON.stringify(selected),
            ),
        [selected],
    );

    const renderExchanges = () =>
        exchanges?.map(elem => (
            <MenuItem
                key={elem.id}
                value={`${elem.name}`}
                data-id={elem.id}
                onClick={handleSelect}
            >
                {elem.name}
            </MenuItem>
        ));

    const handleSelect = (e: React.SyntheticEvent<HTMLLIElement>) => {
        const exchange = exchanges?.filter(
            elem => elem.id === e.currentTarget.dataset.id,
        )[0];
        dispatch(exchangeSelected(exchange));
        if (e.currentTarget.dataset.value && e.currentTarget.dataset.id)
            setSelected({
                name: e.currentTarget.dataset.value,
                id: e.currentTarget.dataset.id,
            });
    };

    return (
        <>
            <FormControl>
                <Select
                    disabled={!exchanges.length}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selected.name}
                    label="Exchange"
                    sx={{
                        m: 0,
                        minWidth: 200,
                        backgroundColor: '#fff',
                        border: 'none',
                        borderRadius: '4px 0 0 4px',
                        '& > div': {
                            padding: '5.5px 14px',
                        },
                    }}
                >
                    {renderExchanges()}
                </Select>
            </FormControl>
        </>
    );
};

export default SelectExchange;
