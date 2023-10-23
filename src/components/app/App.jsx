import './App.module.scss'
import React, {lazy, Suspense} from "react";
import {BrowserRouter, Route, Router, Routes, useNavigate} from "react-router-dom";
export default function App(){
    const MainPage = lazy(()=> import('../MainPage/MainPage.jsx'));
    const DefaultPage = lazy(() => import('../DefaultPage/DefaultPage.jsx'))
    return(<>
        <div>
            hello webpack v1
        </div>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Suspense fallback={<div>loading..</div>}>
                    <MainPage/>
                </Suspense> }/>
                <Route path={'/DefaultPage'} element={<Suspense fallback={<div>loading..</div>}>
                    <DefaultPage/>
                </Suspense> }/>
                {/*<Route path={'/MainPage'} element={<Suspense fallback={<div>loading..</div>}>*/}
                {/*    <MainPage/>*/}
                {/*</Suspense> }/>*/}
            </Routes>
        </BrowserRouter>

    </>)
}
