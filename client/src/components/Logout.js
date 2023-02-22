import React from "react";
import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.setItem("Authorization","")
        navigate("/")
    }

    return (
        <>
            <div >
                <p onClick={handleLogout} className="logout">Logout</p>
            </div>
        </>
    )
}
export default Logout;