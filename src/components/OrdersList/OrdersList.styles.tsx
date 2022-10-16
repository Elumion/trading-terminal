import styled from '@emotion/styled';

export const OrdersContainer = styled.div`
    width: 100%;
    background-color: #242424;

    ul {
        height: calc(100vh - 56px - 57px);
        overflow-y: scroll;
    }
    div,
    li {
        /* background-color: black; */
        color: #bcbcbc;
        width: 100%;
        display: grid;
        grid-template-areas: 'A A B C D F F G G J J L';
        gap: 10px;
        grid-template-columns: 180px 100px 50px 70px repeat(4, 1fr) 50px;
        grid-template-rows: auto;
        align-items: center;
        overflow-wrap: anywhere;
        p {
            font-size: 13px;
        }
    }
    p:nth-of-type(1n) {
    }
    p:nth-of-type(2n) {
    }
    p:nth-of-type(3n) {
    }
    p:nth-of-type(4n) {
    }
    p:nth-of-type(5n) {
        text-align: right;
    }
    p:nth-of-type(6n) {
        text-align: right;
    }
    p:nth-of-type(7n) {
        text-align: right;
    }
    p:nth-of-type(8n) {
        text-align: right;
    }

    li:nth-of-type(1n) {
    }
    li:nth-of-type(2n) {
        background-color: #232c2d;
    }
    li {
        padding: 10px;
        :hover {
            background-color: #434b52;
            p {
                color: #fff;
            }
        }
        button {
            border: none;
            background-color: transparent;
            color: #fff;
            font-weight: 700;
            cursor: pointer;
            :hover {
                color: #57afc5;
            }
        }
    }
    div {
        padding: 10px;
        background-color: #202020;
        color: #fff;
        p {
            font-weight: 800;
            letter-spacing: 1px;
            font-size: 13px;
            overflow-wrap: anywhere;
        }
    }

    @media screen and (max-width: 1380px) {
        div,
        li {
            grid-template-columns: 1fr 1fr 1fr 1fr repeat(4, 1fr) 1fr;
            height: fit-content;
            p {
                font-size: 11px;
            }
        }
    }
    @media screen and (max-width: 1150px) {
        ul {
            height: calc(33vh);
        }
    }
`;
export const OrdersItem = styled.li`
    font-size: 14px;
`;
