require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
mongoose.set('strictQuery', true)
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cors=require("cors")
// {existUser} = require('./utility')
//const {genPassHash} = require('./utility')
const userModel=require("./Models/usermodels")
const bookModel =require("./Models/bookmodels")
// const express=require("express")

const app=express()
const unProtectedRoutes=["/register","/login"]
app.use(express.json({limit:"100mb"}))
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use((req,res,next)=>{
    if(unProtectedRoutes.includes(req.url)){
        next()
    }else{
        if(req.headers.authorization){
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err,uname)=>{
                if(err){
                    return res.sendStatus(403)
                }
                req.uname=uname
                next();
            })
        }else{
            res.send("Authorization required");
        }
    }
})

const port=process.env.PORT || 5000
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`connected to port ${port}`)
    }
})

mongoose.connect("mongodb+srv://lavanya:lavanya@cluster0.s8ek0iq.mongodb.net/?retryWrites=true&w=majority",()=>{
    console.log("connected to db")
},(err)=>{
    console.log(err)
})

app.post('/register', async (req, res) => {
  try{
    const user=await userModel.findOne({email});
    if(user){
        return res.status(403).json({
            status:"failure",
            message:"user already exists"
        })
    }
    bcrypt.hash(password,10,async(err,hash)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                status:'failure',
                message:err.message
            })
        }
      const  newuser=await Register.create({
            email:email,
            password:hash
        })
        res.json({
            status:"success",
            message:"successfully registered",
            newuser
        })
    })
    
}
catch(e){
console.log(e)
    res.json({
        status:"failure",
        message:e.message
    })
}
})

app.post('/login', async(req, res) => {
  try{
  const user=await userModel.findOne({email:email});
        console.log(user)
        if(!user){
            return res.status(404).json({
                status:'failure',
                message:'User does not exists'
            })
        }
        const comparepassword=bcrypt.compare(password,user.password);
        if(comparepassword){
            const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"2h"});
            res.status(201).json({
                status:"success",
                message:"login successful",
                token:token

            })
        }else{
            return res.status(400).json({
                status:"failure",
                message:"Please enter correct password",

            })
        }
        
    }catch(e){
          res.status(401).json({
            status:'failure',
            message:e.message
          })
    }
});


app.get("/books", async (req, res) => {
    try {
      const user = req.uname;
      const data = await bookModel.find({ user });
    //   console.log(data)
      const booksdata = data.map((d) => d.books);
    //   console.log(booksdata)
    //   console.log(...booksdata)
      res.status(200).send(...booksdata);
    } catch {
      res.status(400).send("An error occured while getting data");
    }
  });

app.post("/books",async(req,res)=>{
    const user = req.uname;
    const data=req.body
    const isUser=await bookModel.find({user:user});
    if(isUser.length){
        const bookdata=isUser.map((d)=>d.books)
        const oldData=bookdata[0]
        const newData=[...oldData, data]
        bookModel.updateOne({user:user}, {books:newData}).then(()=>{
            res.status(200).send("added sucessfully")
        }).catch((err)=>{
            res.send(err.message)
        })
    }else{
        bookModel.create({
            user:user,
            books:data
        }).then(()=>{
            res.status(200).send("book added sucessfully")
        })
    }
})

app.delete("/delete", async (req, res) => {
    try {
      const deleteitems = req.body.deleteitems;
      const user = req.uname;
      const deleted = await bookModel.updateOne(
        { user: user },
        { $pull: { books: { _id: { $in: deleteitems } } } }
      );
      if (deleted.modifiedCount) {
        console.log("done")
        res.status(200).send("Contacts Deleted Successfully");
      } else {
        res.status(200).send("There is no contacts to delete");
      }
    } catch {
      res.status(400).send("An error occured while deleting");
    }
  });

app.put("/edit/:id",(req,res)=>{
    const bookID=req.params.id
    console.log(bookID)
    bookModel.updateOne(
        {
            "books._id":bookID
        },
        {
            $set:{
                "books.$.image":req.body.image,
                "books.$.title":req.body.title,
                "books.$.isbn":req.body.isbn,
                "books.$.author":req.body.author,
                "books.$.describe":req.body.describe,
                "books.$.publishdate":req.body.publishdate,
                "books.$.publisher":req.body.publisher
            }
        }).then(()=>{
            res.status(200).send("Book updated sucessfully")
        }).catch((err)=>{
            res.status(400).send(err.message)
        })
})