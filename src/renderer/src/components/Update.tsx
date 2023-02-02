import { off, on, send } from '@renderer/utils/ipcUtil';
import { useEffect, useState } from 'react';

const UpdateInfo = () => {
    const [checking, setChecking] = useState<boolean>(false);
    const [available, setAvailable] = useState<boolean>(false);

    useEffect(() => {
        const listenCheckingForUpdate = () => {
            setChecking(true);
        };

        const listenUpdateAvailable = () => {
            setChecking(false);
            setAvailable(true);
        };

        const listenUpdateNotAvailable = () => {
            setChecking(false);
            setAvailable(false);
        };

        on('checkingForUpdate', listenCheckingForUpdate);
        on('updateAvailable', listenUpdateAvailable);
        on('updateNotAvailable', listenUpdateNotAvailable);

        return () => {
            off('checkingForUpdate', listenCheckingForUpdate);
            off('updateAvailable', listenUpdateAvailable);
            off('updateNotAvailable', listenUpdateNotAvailable);
        };
    }, []);

    return (
        <div>
            <button
                onClick={() => {
                    send('checkForUpdate');
                }}
            >
                CHECK
            </button>
            {checking ? <div>CHECKING...</div> : ''}
            {available ? <div>UPDATE AVAILABLE</div> : <div>UP TO DATE</div>}
        </div>
    );
};

export default UpdateInfo;
