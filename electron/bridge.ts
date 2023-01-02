import { contextBridge, ipcRenderer } from 'electron';
import fs from 'fs';
import { SavedExchange } from '../src/@types/redux.types';

let exportGlobalConfig;
if (fs.existsSync('global_config.json')) {
    exportGlobalConfig = JSON.parse(
        fs.readFileSync('global_config.json', 'utf-8'),
    );
}

const pathToJSON = 'exchanges_API_Info.json';

const { remote } = require('electron');

export const api = {
    globalConfig: exportGlobalConfig,

    editExchange: async (exchange: SavedExchange) => {
        let exchanges: SavedExchange[];
        if (fs.existsSync(pathToJSON)) {
            exchanges = JSON.parse(fs.readFileSync(pathToJSON, 'utf-8'));
            const editExchange = exchanges.filter(
                el => el.id === exchange.id,
            )[0];
            editExchange.name = exchange.name;
            editExchange.apiKey = exchange.apiKey;
            editExchange.apiSecret = exchange.apiSecret;
            if (editExchange.password)
                editExchange.password = exchange.password;

            try {
                fs.writeFileSync(
                    pathToJSON,
                    JSON.stringify(exchanges, null, 4),
                    'utf-8',
                );
                return 'Exchange saved, Success!';
            } catch (e) {
                console.log('Failed to save the file !');
            }
        }
    },

    deleteExchange: (exchangeId: { id: string }) => {
        let exchanges: SavedExchange[];
        if (fs.existsSync(pathToJSON)) {
            exchanges = JSON.parse(fs.readFileSync(pathToJSON, 'utf-8'));

            const resultExchanges = exchanges.filter(
                el => el.id !== exchangeId.id,
            );

            try {
                fs.writeFileSync(
                    pathToJSON,
                    JSON.stringify(resultExchanges, null, 4),
                    'utf-8',
                );
            } catch (e) {
                console.log('Failed to save the file !');
            }
        }
        return `Exchange deleted`;
    },

    addExchange: (newExchange: SavedExchange) => {
        let exchanges = [];
        if (fs.existsSync(pathToJSON)) {
            exchanges = JSON.parse(fs.readFileSync(pathToJSON, 'utf-8'));
            exchanges.push(newExchange);
            try {
                fs.writeFileSync(
                    pathToJSON,
                    JSON.stringify(exchanges, null, 4),
                    'utf-8',
                );
            } catch (e) {
                console.log('Failed to save the file !');
            }
        } else {
            try {
                fs.writeFileSync(
                    pathToJSON,
                    JSON.stringify([newExchange], null, 4),
                    'utf-8',
                );
                exchanges = [newExchange];
            } catch (e) {
                console.log('Failed to save the file !');
            }
        }

        return exchanges;
    },

    getExchanges: (): SavedExchange[] => {
        let exchanges = [];
        if (fs.existsSync(pathToJSON)) {
            exchanges = JSON.parse(fs.readFileSync(pathToJSON, 'utf-8'));
        }
        return exchanges as SavedExchange[];
    },

    /* 
   The function below can accessed using `window.Main.sendMessage`
   */
    sendMessage: (message: string) => {
        ipcRenderer.send('message', message);
    },

    /**
     * Provide an easier way to listen to events
     */
    on: (channel: string, callback: Function) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    },
    minimize: () => {
        var window = remote.getCurrentWindow();
        window.minimize();
    },
    maximize: () => {
        var window = remote.getCurrentWindow();
        let isMaximized;
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
        return isMaximized;
    },
    close: () => {
        var window = remote.getCurrentWindow();
        window.close();
    },
};

contextBridge.exposeInMainWorld('Main', api);
