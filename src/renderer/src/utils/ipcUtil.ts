const { ipcRenderer } = window.electron;

export const send = (channel: string, arg?) => {
    ipcRenderer.send(channel, arg);
};

export const invoke = async (channel: string, arg?) => {
    ipcRenderer.invoke(channel, arg);
};

export const on = (channel: string, listener: () => void) => {
    ipcRenderer.on(channel, listener);
};

export const off = (channel: string, listener: () => void) => {
    ipcRenderer.removeListener(channel, listener);
};
