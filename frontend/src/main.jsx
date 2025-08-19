import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { HashRouter } from "react-router-dom";

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(

        <Provider store={store}>

                <PersistGate loading={null} persistor={persistor}>

                        <HashRouter>

                                <App />
                        </HashRouter>


                </PersistGate>

        </Provider>

)