import styled from '@emotion/styled';

export const ListContainer = styled.div`
    min-width: 200px;
    @media screen and (max-width: 1380px) {
        min-width: 80px;
    }
`;
export const InputContainer = styled.div`
    background-color: #242424;
    input,
    div {
        color: #fff;
    }
    label {
        color: #b8b8b8;
    }
`;

export const StyledCoinsList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 87vh;
    overflow-y: scroll;
    background-color: #242424;
    color: #f1f1f1;

    @media screen and (max-width: 1150px) {
        height: calc(60vh - 56px - 57px);
    }
`;

export const StyledCoinsItem = styled.li`
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 1px 0 1px 25px;
    overflow-wrap: anywhere;
    cursor: pointer;
    :hover {
        color: #000;
        background-color: #fff;
        font-weight: 500;
    }
    @media screen and (min-width: 1150px) and (max-width: 1380px) {
        padding: 4px 2px 4px 5px;
    }
`;
