import { useState } from "react";
import Navbar from "../compontents/Navbar";

const AddBook = () => {
  const [formData, setFormData] = useState({
    bookName: "",
    bookId: "",
    category: "",
    authorName: "",
    bookImage: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, bookImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    formDataToSend.append("BookName", formData.bookName);
    formDataToSend.append("BookId", formData.bookId);
    formDataToSend.append("Category", formData.category);
    formDataToSend.append("Authorname", formData.authorName);
    formDataToSend.append("Description", formData.description);
    
    if (formData.bookImage) {
      formDataToSend.append("Book_img", formData.bookImage);
    }

    try {
      const response = await fetch("api/addBook", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      alert("An error occurred");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-orange-100">
        <Navbar />
        <div className="bg-white p-10 mt-20 rounded-3xl shadow-2xl w-[800px]">
          <h1 className="text-center font-serif font-bold text-4xl">Add Book</h1>
          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <input type="text" name="bookName" placeholder="Book Name" className="w-full border-2 p-3" onChange={handleChange} required />
            <input type="text" name="authorName" placeholder="Author Name" className="w-full border-2 p-3" onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" className="w-full border-2 p-3" onChange={handleChange} required />
            <input type="text" name="bookId" placeholder="Book ID" className="w-full border-2 p-3" onChange={handleChange} required />
            <textarea name="description" placeholder="Book Description" className="w-full border-2 p-3 h-24 resize-none" onChange={handleChange} required></textarea>
            <input type="file" name="bookImage" className="w-full border-2 p-3" onChange={handleFileChange} />
            <button type="submit" className="bg-orange-950 text-white p-3 rounded-xl w-full hover:bg-orange-700">Add Book</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBook;
