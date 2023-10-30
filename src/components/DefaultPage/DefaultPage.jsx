import React from "react";
import {useNavigate} from "react-router-dom";
export default function DefaultPage(){
    const navigate = useNavigate()
    return(
        <>
            <div>
                <h1>default page</h1>
                <button onClick={()=> navigate('/')}>to Main Page</button>
            </div>
        </>
    )
}
