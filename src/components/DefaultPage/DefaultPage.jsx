import React from "react";
import {useNavigate} from "react-router-dom";
export default function Defaultage(){
    const navigate = useNavigate()
    return(
        <>
            <div>
                <button onClick={()=> navigate('/')}>to Main Page</button>
            </div>
        </>
    )
}
