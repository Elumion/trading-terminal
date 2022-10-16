import styled from '@emotion/styled';

export const TopBarContainer = styled.div`
    -webkit-app-region: drag;

    display: flex;
    justify-content: space-between;
    .buttons__container {
        -webkit-app-region: no-drag;
        display: flex;
        gap: 2px;
        button {
            cursor: pointer;
            padding: 0 10px;
        }
        z-index: 5000;
    }
`;
