import React from 'react';
import {Routes,Route} from "react-router-dom";
import './App.css';
import {CssBaseline} from "@mui/material";
import {PrivateRouter} from "./component/routes/PrivateRouter";
const Dashboard = React.lazy(()=>import('./pages/Dashboard/Dashboard'))
const Login = React.lazy(()=>import('./pages/Login/Login'))

function App() {
    return (
        <div className="App">
            <CssBaseline/>
            <Routes>
                <Route path="/dashboard" element={
                    <PrivateRouter>
                        <React.Suspense fallback={<div>Загрузка...</div>}>
                            <Dashboard/>
                        </React.Suspense>
                    </PrivateRouter>
                }/>
                <Route path="/login" element={
                    <React.Suspense fallback={<div>Загрузка...</div>}>
                        <Login/>
                    </React.Suspense>
                }/>
            </Routes>
            <CssBaseline/>
        </div>
    );
}

export default App;
