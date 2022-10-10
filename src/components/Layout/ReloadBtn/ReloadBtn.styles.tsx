import styled from '@emotion/styled';

export const Reload = styled.button`
    min-width: 35px;
    height: 35px;
    background-color: #222;
    border-radius: 100%;
    color: #ffffff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    padding: 5px;
    border: 2px solid #ffffff;
    cursor: pointer;
    transition: transform 200ms linear;
    :hover {
        background-color: #727272;
        animation: spin 1s linear none infinite running;
    }
    :active {
        background-color: #222;
    }

    @keyframes spin {
        0% {
            transform: scale(1.2) rotate(0deg);
        }
        100% {
            transform: scale(1.2) rotate(360deg);
        }
    }
`;
