
import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout'
import { Context } from './AxiosContext'

const Bookmark = () => {
    const [list, setList]=useState([])
    const [item, setItem]=useState({})
    const {bookdetails, setBookdetails, cbook, setCbook}=useContext(Context)
    const navigate=useNavigate()
    const handleEdit=(dt)=>{
        setCbook(dt)
        navigate("/editbook")

    }
    // useEffect(()=>{
    //     setBookdetails([...bookdetails,item])
    // },[item])
    const handleClick=async(d)=>{
        
        // console.log(item._id)
        let isPresent=false;
        for(let i=0;i<bookdetails.length;i++){
            if(bookdetails[i]._id===d._id){
                isPresent=true
                console.log("found")
            }
        }
        console.log("bookdetails", bookdetails)

        if(isPresent){
            alert("Book is already present in your cart.")
            // return;
        }
        else{
            setItem(d)
            // setBookdetails([...bookdetails,item])
            // setTimeout(async()=>{
            //     await setBookdetails([...bookdetails,item])
            // },1000)
            alert("book has been added to your favorite list")
            // return;
        }
        // setItem(d)
        // setBookdetails([...bookdetails,item])
        // alert("book has been added to your favorite list")
        // setBookdetails([...bookdetails,item])
        // setBookdetails([])
        // console.log(bookdetails)
    }
    useEffect(()=>{
        setBookdetails([...bookdetails,item])
    },[item])
    const deletesingle = (id) => {
        let data = [id];
        let token = localStorage.getItem("Authorization");
        axios({
          method: "DELETE",
          url: "http://localhost:3001/delete",
          headers: {
            authorization: token,
          },
          data: {
            deleteitems: data,
          },
        });
        // alert("book will be deleted sucessfully")
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
        alert("book will be deleted !")
      };
    
    useEffect(()=>{
        const token=localStorage.getItem("Authorization")
        axios({
            url:"http://localhost:3001/books",
            method:"get",
            headers:{
                authorization:token
            }
        }).then((res)=>{
            console.log(res.data)
            setList(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        
    },[])
  return (
    <div className='parent'>
        <h1> Books List</h1>
        <div className='child'>
        
        <p onClick={()=>navigate("/favorite")} className="cart">Go to Cart</p>
        
        <p onClick={()=>navigate("/addbook")} className="bbtn">Add new Book</p>
        <Logout/>
        </div>
        <div className='container'>
            {
                list.map((k,i)=>{
                    return(
                        <div key={k._id} className="cards" >
                            <img src={k.image} alt="loading"></img>
                            <p>Title : {k.title}</p>
                            <p>Tuthor Name : {k.author}</p>
                            <p>Description : {k.describe}</p>
                            <p>Publish_Date : {k.publishdate}</p>
                            <p>Publisher : {k.publisher}</p>
                            <div className='btns'>
                            <button onClick={()=>handleClick(k)} className="atc">Add to Cart</button>
                            <button onClick={()=>handleEdit(k)} className="edt">Edit book</button>
                            <button onClick={()=>deletesingle(k._id)} className="dlt">Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Bookmark