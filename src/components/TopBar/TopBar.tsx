import React from 'react';
import { TopBarContainer } from './TopBar.styles';

export default function TopBar() {
    const handleMinimize = () => {
        window.Main.minimize();
    };
    const handleMaximize = () => {
        window.Main.maximize();
    };
    const handleClose = () => {
        window.Main.close();
    };

    return (
        <TopBarContainer>
            <p>Trading Terminal</p>
            <div className="buttons__container">
                <button onClick={handleMinimize}>-</button>
                <button onClick={handleMaximize}>||</button>
                <button onClick={handleClose}>X</button>
            </div>
        </TopBarContainer>
    );
}
