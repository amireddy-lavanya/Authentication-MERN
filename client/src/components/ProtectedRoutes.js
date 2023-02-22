import {Outlet,Navigate} from "react-router-dom"

const Protected=()=>{
    const token=localStorage.getItem("Authorization")
    return (
        <>
            {token ? <Outlet/> : <Navigate to="/"/>}
        </>
    )
}
export default Protected;