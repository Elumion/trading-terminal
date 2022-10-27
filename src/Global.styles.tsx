import { css } from '@emotion/react';

export const GlobalStyles = css`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html,
    body,
    #root {
        min-height: 100%;
    }

    body {
        margin: 0;
        font-family: 'Lexend', 'Poppins', sans-serif;
        background-color: #2e2e2e;
        font-weight: 300;
        color: #fff;
    }
    button {
        font-weight: 300;
        font-family: 'Lexend', 'Poppins', sans-serif;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        font-weight: normal;
        margin: 0;
    }

    a {
        text-decoration: none;
    }
`;

export const GlobalClasses = css`
    .scroll {
        ::-webkit-scrollbar-track {
            border: 1px solid transparent;
            padding: 2px 0;
            background-color: transparent;
        }

        ::-webkit-scrollbar {
            width: 6px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #f1f1f1;
            border: 1px solid #f1f1f1;
            transform: rotate(180deg);
        }
    }
`;
