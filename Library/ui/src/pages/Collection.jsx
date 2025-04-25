import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCollections = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("api/getMyCollection", { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBooks(data.books));
  }, []);

  const handleRemove = (bookId) => {
    fetch(`api/removeFromCollection/${bookId}`, {
      method: "DELETE",
      credentials: 'include',
    })
      .then(res => res.json())
      .then(() => setBooks(prev => prev.filter(b => b.B_Id !== bookId)));
  };

  return (
    <div className="bg-orange-50 min-h-screen pt-28 px-5 flex gap-5 flex-wrap">
      {books.map(book => (
        <div key={book.B_Id} className="bg-orange-200 p-5 h-[450px] w-[500px] rounded-2xl shadow-xl">
          <img src={book.image} alt={book.B_Name} className="w-28" />
          <h2 className="font-serif font-bold text-xl">{book.B_Name}</h2>
          <p>{book.B_description.slice(0, 150)}...</p>
          <div className="flex justify-between mt-6">
            <button
              className="text-white bg-orange-950 w-[100px] rounded-2xl hover:text-orange-600"
              onClick={() => navigate(`/read/${book.B_Id}`)}
            >
              Read
            </button>
            <button
              className="text-white bg-red-700 w-[100px] rounded-2xl hover:bg-red-900"
              onClick={() => handleRemove(book.B_Id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCollections;
