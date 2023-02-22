import React,{ useContext} from 'react'
import Logout from './Logout'
import { Context } from './AxiosContext'

const Favorite = () => {
    const {bookdetails}=useContext(Context)
   
  return (
    <div className='parent'>
        <h1> Favorite Books</h1>
        <Logout/>
        <div className='container'>
            {
                bookdetails.map((book,index)=>{
                    if(book.title){
                        return (
                            <div key={index} className="cards">
                                <img src={book.image} alt="loading"></img>
                                <p>Title : {book.title}</p>
                                <p>Author Name : {book.author}</p>
                                <p>Description : {book.describe}</p>
                                <p>Publish_Date : {book.publishdate}</p>
                                <p>Publisher : {book.publisher}</p>
                            </div>
                        ) 
                    }
                    
                })
            }
        </div>
    </div>
  )
}

export default Favorite;