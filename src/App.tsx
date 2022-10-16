import React, { useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Balances } from './pages/Balances';
import { Exchanges } from './pages/Exchanges';
import { Terminal } from './pages/Terminal';
import * as ccxt from 'ccxt';
import { Layout } from './components/Layout';
import { Global } from '@emotion/react';
import { GlobalClasses, GlobalStyles } from './Global.styles';
import { AddExchange } from './pages/AddExchange';
import { Notification } from './components/Notification';

function App() {
    return (
        <div className="App">
            <Global styles={GlobalStyles} />
            <Global styles={GlobalClasses} />
            <Notification />
            <HashRouter>
                <Routes>
                    <Route
                        path="/terminal"
                        element={
                            <Layout>
                                <Terminal />
                            </Layout>
                        }
                    ></Route>
                    <Route
                        path="/exchanges"
                        element={
                            <Layout>
                                <Exchanges />
                            </Layout>
                        }
                    ></Route>
                    <Route
                        path="/balances"
                        element={
                            <Layout>
                                <Balances />
                            </Layout>
                        }
                    ></Route>
                    <Route
                        path="/addExchange"
                        element={
                            <Layout>
                                <AddExchange />
                            </Layout>
                        }
                    ></Route>
                    <Route
                        path="/"
                        element={<Navigate replace to="/Terminal" />}
                    ></Route>
                    <Route
                        path="*"
                        element={<Navigate replace to="/Terminal" />}
                    ></Route>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
