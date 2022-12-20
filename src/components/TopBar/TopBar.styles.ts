import styled from '@emotion/styled';

const defaultColors = {
    default: '#b9b9b9',
    onHover: '#141414',
    minimizeOnHoverBackground: '#cacaca98',
    maximizeOnHoverBackground: '#cacaca',
    closeOnHoverBackground: '#ca3535',
};

export const TopBarContainer = styled.div`
    -webkit-app-region: drag;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    background-color: #131313;
    .buttons__container {
        -webkit-app-region: no-drag;
        display: flex;
        button {
            cursor: pointer;
            padding: 0 20px;
            background-color: transparent;
            border: none;
            border-radius: 3px;
            position: relative;
            transition: background-color 100ms linear, color 200ms linear;
        }
        .minimize {
            :hover {
                background-color: ${defaultColors.minimizeOnHoverBackground};
                ::after {
                    border-bottom: 1px solid ${defaultColors.onHover};
                }
            }
            ::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 11px;
                height: 2px;
                border-bottom: 1px solid ${defaultColors.default};
            }
        }

        .maximize {
            :hover {
                background-color: ${defaultColors.maximizeOnHoverBackground};

                ::after {
                    border: 1px solid ${defaultColors.onHover};
                }
            }
            ::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 10px;
                height: 10px;
                border: 1px solid ${defaultColors.default};
            }
        }

        .close {
            :hover {
                background-color: ${defaultColors.closeOnHoverBackground};
                ::after,
                ::before {
                    background-color: #fff;
                }
            }

            ::after,
            ::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 15px;
                height: 1px;
                background-color: ${defaultColors.default};
            }
            ::after {
                transform: translate(-50%, -50%) rotate(45deg);
            }
            ::before {
                transform: translate(-50%, -50%) rotate(-45deg);
            }
        }
    }
`;
