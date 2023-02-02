import UpdateInfo from './components/Update';
import { DndContext } from '@dnd-kit/core';
import ToDoContainer from './components/ToDoContainer';
import InProgressContainer from './components/InProgressContainer';
import DoneContainer from './components/DoneContainer';
import { Provider } from 'jotai/react';

function App(): JSX.Element {
    return (
        <Provider>
            <DndContext>
                <div className="container">
                    <div className="flex flex-row">
                        <DndContext>
                            <ToDoContainer />
                            <InProgressContainer />
                            <DoneContainer />
                        </DndContext>
                    </div>
                    <UpdateInfo />
                </div>
            </DndContext>
        </Provider>
    );
}

export default App;
