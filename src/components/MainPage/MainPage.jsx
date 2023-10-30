import MainPageStyle from './MainPage.module.scss'
import {useNavigate} from "react-router-dom";
import React from "react";
export function MainPage(){
    const navigate = useNavigate()
    return(<>
        <section>
            <div id={'title'}></div>
            <div id={'body'}>
                <div>first
                <button onClick={() => navigate('/DefaultPage')}>to default page</button></div>
                <div>second</div>
                <div>third</div>
            </div>
            <div id={'footer'}>
                <h1>
                    footer here
                </h1>
            </div>
        </section>
    </>)
}
