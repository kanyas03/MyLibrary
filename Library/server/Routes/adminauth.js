import { Router } from "express";
import  authenticate  from "../middleware/auth.js";
import admincheck from "../middleware/admincheck.js";
import { addBook } from "../model/addBook.js";
import upload from "../middleware/upload.js";
import { user } from "../model/User.js";
import adminCheck from "../middleware/admincheck.js";



const adminauth=Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

adminauth.get('/users', authenticate,adminCheck,  async (req, res) => {
    try {
        // Fetch all user details except passwords
        const users = await user.find({}, { password: 0 });

        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



adminauth.delete('/users/:id', authenticate, adminCheck, async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await user.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





adminauth.post('/addBook', authenticate, upload.single("Book_img"), async (req, res) => {   
    try {
        const { BookName, BookId, Category, Authorname, Description } = req.body; // ✅ Include Description
        
        const existingBook = await addBook.findOne({ B_Id: BookId });
        if (existingBook) {
            return res.status(400).send("Book already exists");
        }

        let imageBase64 = null;
        if (req.file) {
            imageBase64 = `data:image/png;base64,${convertToBase64(req.file.buffer)}`;
        }

        const newBook = new addBook({
            B_Id: BookId,
            B_Name: BookName,
            B_category: Category,
            B_author: Authorname,
            B_description: Description, 
            image: imageBase64
        });

        await newBook.save();
        res.status(201).send("Book added successfully");
    } catch (error) {
        console.error("Error in addBook:", error.message);
        res.status(500).json({ error: error.message });
    }
});





adminauth.get('/getBook',async(req,res)=>{
    try{
        const Bname = req.query.B_Name;
        const result=await addBook.find()
         if(result){
            //console.log(result)
            res.status(200).json({data:result})
        }
        else{
        res.status(404).json({message:"Book not found"})
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})




adminauth.get("/getBook/:BookId", async (req, res) => {
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



adminauth.put("/updateBook/:BookId", authenticate, admincheck, upload.single("Book_img"), async (req, res) => {
    try {
      console.log("Received Data:", req.body);
      console.log("BookId from params:", req.params.BookId);
  
      const { BookId } = req.params;
      const { B_Name, B_category, B_author, B_description } = req.body;
  
      if (!B_Name || !B_category || !B_author || !B_description) {
        return res.status(400).json({ msg: "All fields are required" });
      }
  
      const updateFields = {
        B_Name,
        B_category,
        B_author,
        B_description,
      };
  
      if (req.file) {
        updateFields.image = req.file.filename;
      }
  
      const updatedBook = await addBook.findOneAndUpdate(
        { B_Id: BookId },
        updateFields,
        { new: true }
      );
  
      if (!updatedBook) {
        return res.status(404).json({ msg: "Book not found" });
      }
  
      res.json({ msg: "Book updated successfully", updatedBook });
    } catch (error) {
      console.error("Error updating Book:", error);
      res.status(500).json({ msg: "Server error", error });
    }
  });
  





adminauth.delete('/deleteBook/:BookId', authenticate,admincheck,  async (req, res) => {
    try {
        const { BookId } = req.params; 
        const result = await addBook.findOne({ B_Id: BookId }); // FIXED: Changed from addProduct to addBook

        if (result) {
            await addBook.findOneAndDelete({ B_Id: BookId }); 
            res.status(200).json({ message: "Book successfully deleted" }); // Sending JSON response
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Server Error" });
    }
});






// adminauth.get('/orderdetails', authenticate, async (req, res) => {
//     try {
//         // Fetch orders with populated user details
//         const orders = await placeorder.find()
//             .populate({
//                 path: 'userId',
//                 select: '_id userName dept Ph firstName lastName'
//             });

//         // Debugging: Log the fetched data
//         console.log("Fetched Orders:", JSON.stringify(orders, null, 2));

//         if (!orders || orders.length === 0) {
//             return res.status(404).json({ message: "No orders found" });
//         }

//         // Format response
//         const formattedOrders = orders.map(order => ({
//             orderId: order._id,
//             productName: order.p_Name,
//             quantity: order.p_quantity,
//             orderDate: order.orderDate,
//             userDetails: order.userId ? {
//                 userId: order.userId._id,
//                 userName: order.userId.userName,
//                 department: order.userId.dept,
//                 phone: order.userId.Ph
//             } : null
//         }));

//         res.status(200).json(formattedOrders);
//     } catch (error) {
//         console.error("Error occurred:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });








  
export {adminauth}