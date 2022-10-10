import { app, BrowserWindow, ipcMain, screen } from 'electron';
import { globalConfig } from './global_config';
import { createCors } from './cors';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import fs from 'fs';

if (!fs.existsSync('global_config.json')) {
    fs.writeFileSync(
        'global_config.json',
        JSON.stringify(globalConfig, null, 4),
        'utf-8',
    );
}

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    mainWindow = new BrowserWindow({
        // icon: path.join(assetsPath, 'assets', 'icon.png'),
        width: width,
        height: height,
        minWidth: 730,
        minHeight: height,
        backgroundColor: '#2e2e2e',
        title: 'Trading terminal',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // mainWindow.removeMenu();

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

async function registerListeners() {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    ipcMain.on('message', (_, message) => {
        console.log(message);
    });
}

app.on('ready', createWindow)
    .whenReady()
    .then(registerListeners)
    .then(() => {
        installExtension(REDUX_DEVTOOLS)
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(err => console.log('An error occurred: ', err));
    })
    .catch(e => console.error(e));

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

createCors();
