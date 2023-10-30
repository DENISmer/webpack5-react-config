import './App.module.scss'
import React, {lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "../MainPage/MainPage.jsx";
import {RouterProvider} from "react-router";
export default function App(){
    // const MainPage = lazy(()=> import('../MainPage/MainPage.jsx'));
    const DefaultPage = lazy(() => import('../DefaultPage/DefaultPage.jsx'));

    // const router = createBrowserRouter([
    //     {
    //         path: '/',
    //         element: <MainPage />
    //     },
    //     {
    //         path: 'DefaultPage',
    //         // element: <Suspense fallback={<div>loading..</div>}>
    //         //     <DefaultPage/>
    //         // </Suspense>
    //         lazy: () => import('../DefaultPage/DefaultPage.jsx')
    //     },
    //     {
    //         path: '*',
    //         element: <div> Not Found or You do not have permission.
    //             <Link to={'/'}>to '/'</Link></div>
    //     }
    // ])

    return(<>
        {/*<div>*/}
        {/*    hello webpack v1*/}
        {/*</div>  */}
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<MainPage />} />
                    <Route path="DefaultPage" element={<Suspense fallback={<div>loading..</div>}>
                             <DefaultPage/>
                        </Suspense>} />
                    {/*<Route path="pathB" element={<ComponentB />} />*/}
                    {/*<Route path="pathC" element={<ComponentC />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>



        {/*<React.StrictMode>*/}
        {/*    <RouterProvider router={router} />*/}
        {/*</React.StrictMode>*/}
    </>)
}
