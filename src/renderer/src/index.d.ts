import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
    interface Window {
        electron: ElectronAPI;
        api: unknown;
        ipcRenderer: import('electron').IpcRenderer;
        fs: typeof import('fs');
    }
}
