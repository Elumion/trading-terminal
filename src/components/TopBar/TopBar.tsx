import { ipcRenderer } from 'electron/renderer';
import React, { useEffect, useState } from 'react';
import { TopBarContainer } from './TopBar.styles';

export default function TopBar() {
    const handleMinimize = () => {
        window.Main.minimize();
    };
    const handleMaximize = () => {
        const result = window.Main.maximize();
    };
    const handleClose = () => {
        window.Main.close();
    };

    return (
        <TopBarContainer>
            <p>Trading Terminal</p>
            <div className="buttons__container">
                <button className="minimize" onClick={handleMinimize}></button>
                <button className="maximize" onClick={handleMaximize}></button>
                <button className="close" onClick={handleClose}></button>
            </div>
        </TopBarContainer>
    );
}
