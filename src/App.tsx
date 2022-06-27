import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './core/store/configureStore';
import { Provider } from 'react-redux';

import './App.css';
import MainView from './view';

const store = ConfigureStore(); // Gọi store để gắn vào các component con

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainView />
            </BrowserRouter>
        </Provider>
    );
};

export default App;