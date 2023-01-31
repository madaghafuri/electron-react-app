import Versions from './components/Versions';
import icons from './assets/icons.svg';
import { useEffect, useState } from 'react';
import { on, off, send } from './utils/ipcUtil';

function App(): JSX.Element {
    const [checking, setChecking] = useState<boolean>(false);
    const [available, setAvailable] = useState<boolean>(false);

    useEffect(() => {
        const listenCheckingForUpdate = () => {
            setChecking((state) => !state);
        };

        const listenUpdateAvailable = () => {
            setAvailable(true);
        };

        const listenUpdateNotAvailable = () => {
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
        <div className="container">
            <Versions></Versions>

            <svg className="hero-logo" viewBox="0 0 900 300">
                <use xlinkHref={`${icons}#electron`} />
            </svg>
            <h2 className="hero-text">
                You{"'"}ve successfully created an Electron project with React and TypeScript
            </h2>
            <p className="hero-tagline">
                Please try pressing <code>F12</code> to open the devTool
            </p>

            <div className="links">
                <div className="link-item">
                    <a target="_blank" href="https://evite.netlify.app" rel="noopener noreferrer">
                        Documentation
                    </a>
                </div>
                <div className="link-item link-dot">•</div>
                <div className="link-item">
                    <a
                        target="_blank"
                        href="https://github.com/alex8088/electron-vite"
                        rel="noopener noreferrer"
                    >
                        Getting Help
                    </a>
                </div>
                <div className="link-item link-dot">•</div>
                <div className="link-item">
                    <a
                        target="_blank"
                        href="https://github.com/alex8088/quick-start/tree/master/packages/create-electron"
                        rel="noopener noreferrer"
                    >
                        create-electron
                    </a>
                </div>
            </div>
            <div>
                <button
                    onClick={() => {
                        send('checkForUpdate');
                    }}
                >
                    CHECK
                </button>
            </div>
            {checking ? <div>CHECKING...</div> : <div>NOT CHECKING</div>}
            {available ? <div>UPDATE AVAILABLE</div> : <div>NO UPDATE</div>}
        </div>
    );
}

export default App;
