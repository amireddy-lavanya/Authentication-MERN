import { createContext, useState } from "react";

export const Context=createContext();
export default function ContextProvider(props){
    const [bookdetails,setBookdetails]=useState([]);
    const [cbook, setCbook]=useState({})



    return(
        <>
        <Context.Provider value={{bookdetails,setBookdetails,cbook,setCbook}}>
            {props.children}
        </Context.Provider>
        </>
    )
}