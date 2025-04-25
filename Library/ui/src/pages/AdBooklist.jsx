import React, { useEffect, useState } from 'react';
import Navbar from '../compontents/Navbar';
import { useNavigate } from "react-router-dom";

const AdminBookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("api/getBook")
            .then(response => response.json())
            .then(data => setBooks(data.data))
            .catch(error => console.error("Error fetching books:", error));
    }, []);

    const handleDelete = async (bookId) => {
            try {
              const token = localStorage.getItem("token");
        
              const res = await fetch(`api/deleteBook/${bookId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
        
              const data = await res.json();
        
              if (res.status === 200) {
                alert(data.message);
                setBooks((prevBooks) => prevBooks.filter((book) => book.B_Id !== bookId));
              } else {
                alert(`Failed: ${data.message}`);
                console.error("Error response:", data);
              }
            } catch (err) {
              console.error("Error deleting book:", err);
            }
          };

    return (
        <>
        <Navbar/>
        <div className="p-10">
            <table className="w-full border border-collapse mt-20">
                <thead>
                    <tr className="bg-orange-950 text-white">
                        <th className="border p-2">Book Id</th>
                        <th className="border p-2">Book Name</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Author</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.B_Id} className="text-center border">
                            <td className="border p-2">{book.B_Id}</td>
                            <td className="border p-2 flex flex-col items-center">
                                <img src={book.image} alt={book.B_Name} className="w-20 h-20 object-cover" />
                                <p>{book.B_Name}</p>
                            </td>
                            <td className="border p-2">{book.B_category}</td>
                            <td className="border p-2">{book.B_author}</td>
                            <td className="border p-2">
                            <button
                                onClick={() => navigate(`/updateBook/${book.B_Id}`)}
                                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                                Edit
                            </button>

                                <button
                  onClick={() => handleDelete(book.B_Id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default AdminBookList;





// import React, { useEffect, useState } from "react";

// const AdBookList = () => {
//   const [books, setBooks] = useState([]);

//   const fetchBooks = async () => {
//     try {
//       const res = await fetch("api/getBooks");
//       const data = await res.json();
//       setBooks(data);
//     } catch (err) {
//       console.error("Error fetching books:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleDelete = async (bookId) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`api/deleteBook/${bookId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (res.status === 200) {
//         alert(data.message);
//         setBooks((prevBooks) => prevBooks.filter((book) => book.B_Id !== bookId));
//       } else {
//         alert(`Failed: ${data.message}`);
//         console.error("Error response:", data);
//       }
//     } catch (err) {
//       console.error("Error deleting book:", err);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📚 Admin Book List</h2>

//       {books.length === 0 ? (
//         <p className="text-center text-gray-500">No books available</p>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//           {books.map((book) => (
//             <div key={book.B_Id} className="bg-white rounded-xl shadow-md overflow-hidden">
//               <img
//                 src={book.image || "https://via.placeholder.com/300x180"}
//                 alt={book.B_Name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">{book.B_Name}</h3>
//                 <p className="text-sm text-gray-600"><strong>Author:</strong> {book.B_author}</p>
//                 <p className="text-sm text-gray-600"><strong>Category:</strong> {book.B_category}</p>
//                 <p className="text-sm text-gray-700 mt-2">{book.B_description}</p>

//                 {/* ✅ Styled Delete Button */}
//                 <button
//                   onClick={() => handleDelete(book.B_Id)}
//                   className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdBookList;
