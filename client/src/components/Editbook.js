import React, { useState, useContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Context } from "./AxiosContext";


const Editbook = () => {
    const [add, setAdd]=useState({})
    const [value,setvalue] = useState("No File Chosen")
    const {cbook}=useContext(Context)
    const navigate=useNavigate()
    
    const convertbase64 = (file)=> new Promise((res,rej)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => res(reader.result)
        reader.onerror = (err) =>rej(err)
    })
    const onupload = async (e)=>{
        console.log("Hello")
        const file = e.target.files[0]
        const base64 = await convertbase64(file)
        setAdd({...add,image:base64})
        setvalue(e.target.value)
    }
    const handleAdd=()=>{
        const token=localStorage.getItem("Authorization")
        console.log(cbook._id)
        if(!add.title || !add.isbn || !add.author || !add.describe || !add.publishdate || !add.publisher || !add.image){
            alert("please fill all the fields")
        }else{
            axios({
                url:`http://localhost:5000/edit/${cbook._id}`,
                method:"put",
                headers:{
                    authorization:token
                },
                data:{
                    image:add.image,
                    title:add.title,
                    isbn:add.isbn,
                    author:add.author,
                    describe:add.describe,
                    publishdate:add.publishdate,
                    publisher:add.publisher
                }
            }).then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
            navigate("/bookmark")
        }
        
    }
    return (
        <>
            <div className="edit-container">
                <div className="add-innerContainer">
                    <form>
                        <h2>Edit book</h2>
                        <div className='part1'>
                        {/* <span>
                          {value}
                        </span> */}
                        <label htmlFor='file'>
                            Book Image  :
                        </label>
                        <input type="file" id="file" onChange={(e)=> onupload(e)} required />
                    </div>
                        
                        <div>
                            <label for="title"> Title :</label>
                            <input type="text"   name="title" id="title"  onChange={(e) => { setAdd({ ...add, title: e.target.value }) }} required></input>
                        </div>
                        <div>
                            <span>ISBN :</span>
                            <input type="text"   name="isbn" onChange={(e) => { setAdd({ ...add, isbn: e.target.value }) }} required ></input>
                        </div>
                        <div>
                            <span>Author :</span>
                            <input type="text"   name="author" onChange={(e) => { setAdd({ ...add, author: e.target.value }) }} required ></input>
                        </div>
                        <div>
                            <span>Description :</span>
                            <input type="text"   name="describe" onChange={(e) => { setAdd({ ...add, describe: e.target.value }) }} required ></input>
                        </div>
                        <div>
                            <span>Publish_Date :</span>
                            <input type="date"   name="publishdate" onChange={(e) => { setAdd({ ...add, publishdate: e.target.value }) }} required ></input>
                        </div>
                        <div>
                            <span>Publisher :</span>
                            <input type="text"   name="publisher" onChange={(e) => { setAdd({ ...add, publisher: e.target.value }) }} required ></input>
                        </div>
                        <div>
                            <button onClick={handleAdd}>Submit</button>
                        </div>
                        {/* <div>
                            <button onClick={() => navigate("/bookmark")} className="btn">Show books</button>
                        </div> */}
                    </form>
                </div>
            </div>

        </>
    )
}
export default Editbook