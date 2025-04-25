import React, { useState, useEffect } from "react";
import Navbar from "../compontents/UserNavbar";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [collection, setCollection] = useState(
    JSON.parse(localStorage.getItem("collection")) || []
  );

  useEffect(() => {
    fetch("api/getBook")
      .then((response) => response.json())
      .then((data) => setBooks(data.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const addToCollection = (book) => {
    if (!collection.find((item) => item.B_Id === book.B_Id)) {
      const updatedCollection = [...collection, book];
      setCollection(updatedCollection);
      localStorage.setItem("collection", JSON.stringify(updatedCollection));
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen">
      <Navbar />
      <div className="mt-20 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.B_Id} className="bg-orange-200 p-5 rounded-2xl">
            <img src={book.image} alt={book.B_Name} className="w-28" />
            <h2 className="font-serif font-bold text-xl">{book.B_Name}</h2>
            <p className="font-semibold">By {book.B_author}</p>
            <button
              className="text-white bg-orange-950 w-full rounded-2xl mt-4 p-2"
              onClick={() => addToCollection(book)}
            >
              Add To Collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
