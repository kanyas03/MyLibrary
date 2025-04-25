import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../compontents/Navbar";

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    category: "",
    description: "",
    bookImage: null,
  });

  useEffect(() => {
    fetch(`/api/getBook/${bookId}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          bookName: data.B_Name,
          authorName: data.B_author,
          category: data.B_category,
          description: data.B_description,
          bookImage: null, // Don't prefill file input
        });
      })
      .catch((err) => {
        console.error("Error loading book:", err);
      });
  }, [bookId]);

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

    formDataToSend.append("B_Name", formData.bookName);
    formDataToSend.append("B_category", formData.category);
    formDataToSend.append("B_author", formData.authorName);
    formDataToSend.append("B_description", formData.description);

    if (formData.bookImage) {
      formDataToSend.append("Book_img", formData.bookImage);
    }

    try {
      const response = await fetch(`/api/updateBook/${bookId}`, {
        method: "PUT",
        body: formDataToSend,
        credentials: "include",
      });

      const data = await response.json();
      alert(data.msg);
      if (response.ok) navigate("/adminhome");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-100">
      <Navbar />
      <div className="bg-white p-10 mt-20 rounded-3xl shadow-2xl w-[800px]">
        <h1 className="text-center font-serif font-bold text-4xl">Update Book</h1>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="bookName"
            placeholder="Book Name"
            value={formData.bookName}
            onChange={handleChange}
            className="w-full border-2 p-3"
            required
          />
          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            value={formData.authorName}
            onChange={handleChange}
            className="w-full border-2 p-3"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border-2 p-3"
            required
          />
          <textarea
            name="description"
            placeholder="Book Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-2 p-3 h-24 resize-none"
            required
          ></textarea>

          <input
            type="file"
            name="bookImage"
            className="w-full border-2 p-3"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="bg-orange-950 text-white p-3 rounded-xl w-full hover:bg-orange-700"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
