import { Schema } from "mongoose";
import { model } from "mongoose";

const library = new Schema({
     B_Id: { type: String, required: true, unique: true },
     B_Name: { type: String, required: true },
     B_category: { type: String, required: true },
     B_author: { type: String, required: true },
     B_description: { type: String, required: true }, // ✅ Added Description field
     image: { type: String },
});

const addBook = model('Books', library);
export { addBook };
