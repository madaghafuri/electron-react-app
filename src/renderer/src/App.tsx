import UpdateInfo from './components/Update';
import { Provider } from 'jotai/react';
import DragDropContext from './components/DragNDrop/DragDropContex';
import NewContainer from './components/NewContainer';

function App(): JSX.Element {
    return (
        <Provider>
            <div className="container">
                <DragDropContext>
                    <div className="flex flex-row gap-2">
                        <NewContainer />
                    </div>
                </DragDropContext>
                <UpdateInfo />
            </div>
        </Provider>
    );
}

export default App;
