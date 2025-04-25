import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { user } from "../model/User.js";
import { addBook } from "../model/addBook.js";
import { Collection } from "../model/collection.js";
//import authenticate from "../middleware/auth.js";
//import usercheck from "../middleware/usercheck.js";



const userauth=Router();
userauth.post('/signup', async (req, res) => {
    try {
        

        const { FirstName, LastName, UserName, password, confirmPassword, PhoneNumber, UserRole } = req.body;

        if (!FirstName || !LastName || !UserName || !PhoneNumber || !password || !confirmPassword || !UserRole) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await user.findOne({ userName: UserName });
        if (existingUser) {
            return res.status(400).send("This user name already exists");
        }

        if (UserRole === 'Admin') {
            const existingadmin = await user.findOne({ userRole: "Admin" });
            if (existingadmin) {
                return res.status(403).send("Admin already exists, you're not allowed");
            }
        }

        const newpassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            firstName: FirstName,
            lastName: LastName,
            userName: UserName,
            Ph: PhoneNumber,
            password: newpassword,
            confirmpassword: confirmPassword,
            userRole: UserRole
        });

        await newUser.save();
        res.status(201).send("Sign up successfully");
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: error.message });
    }
});






userauth.post('/login',async(req,res)=>{
    try{
        const{UserName,password}=req.body;
        const result= await user.findOne({userName:UserName});
        if(!result){
            res.status(400).send("Invaild User name");
        }
        else
        {  
            console.log(result.password);
          
            const valid=await bcrypt.compare(password,result.password);
            
            console.log(valid);
            if(valid){
                const token= jwt.sign({ userId:result._id,userRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'1hr'});
                console.log(token);
                
                
                res.cookie('librayAuth',token,
                {
                    httpOnly:true

                });
                
                res.status(200).json({success:true,message:"logged in successfuly,",userRole:result.userRole});
                console.log(`${UserName},`)
                console.log(result.userRole)
            }
            else{
                res.status(401).send("Unauthorized Access");
            }
        }
    }
    catch{
        res.status(500).send("Internal Server Error")

    }
})


userauth.get('/getBook',async(req,res)=>{
    try{
        const Bname = req.query.B_Name;
        const result=await addBook.find()
         if(result){
            //console.log(result)
            res.status(200).json({data:result})
        }
        else{
        res.status(404).json({message:"Product not found"})
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})

userauth.post('/addToCollection', async (req, res) => {
    try {
      const userId = req.userId;
      const { bookId } = req.body;
  
      const exists = await Collection.findOne({ userId, bookId });
      if (exists) {
        return res.status(400).json({ message: 'Already in collection' });
      }
  
      await Collection.create({ userId, bookId });
      res.status(201).json({ message: 'Added to collection' });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Get user's collection
  userauth.get('/getMyCollection', async (req, res) => {
    try {
      const userId = req.userId;
      const collection = await Collection.find({ userId });
      const bookIds = collection.map(c => c.bookId);
      const books = await addBook.find({ B_Id: { $in: bookIds } });
      res.status(200).json({ books });
    } catch {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Remove from collection
  userauth.delete('/removeFromCollection/:bookId', async (req, res) => {
    try {
      const userId = req.userId;
      const bookId = req.params.bookId;
  
      const removed = await Collection.findOneAndDelete({ userId, bookId });
      if (!removed) {
        return res.status(404).json({ message: 'Not found in collection' });
      }
  
      res.status(200).json({ message: 'Removed from collection' });
    } catch {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
 
 userauth.get("/getBook/:BookId", async (req, res) => {
     try {
         const { BookId } = req.params;
         console.log("Fetching Book with ID:", BookId);
         const Book = await addBook.findOne({ B_Id: BookId });
 
         if (!Book) {
             return res.status(404).json({ message: "Book not found" });
         }
 
         res.json(Book);
     } catch (error) {
         console.error("Error fetching Book:", error);
         res.status(500).json({ message: "Server error", error });
     }
 });
 






userauth.get('/logout',(req,res)=>{
    res.clearCookie('librayAuth');
    res.status(200).send("successfuly logout")
})


export {userauth}