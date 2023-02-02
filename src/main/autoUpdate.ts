import { ipcMain, WebContents } from 'electron';
import { autoUpdater } from 'electron-updater';

export const updater = (webContent: WebContents) => {
    autoUpdater.autoDownload = false;

    ipcMain.on('checkForUpdate', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });

    autoUpdater.on('checking-for-update', () => {
        webContent.send('checkingForUpdate');
    });

    autoUpdater.on('update-available', () => {
        webContent.send('updateAvailable');
    });

    autoUpdater.on('update-not-available', () => {
        webContent.send('updateNotAvailable');
    });
};
