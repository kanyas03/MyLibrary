// import React, { useEffect, useState } from 'react';
// import Navbar from '../compontents/UserNavbar';

// const ViewBooks = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await fetch('api/getBook'); // Replace YOUR_PORT with your backend port
//         const data = await res.json();
//         setBooks(data.data); // assuming response is { data: [...] }
//       } catch (error) {
//         console.error("Failed to fetch books:", error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div className="bg-orange-50 ">
//       <Navbar />
//       <div className="flex flex-wrap justify-center gap-6 px-4">
//         {books.map((book) => (
//           <div
//             key={book.B_Id}
//             className="bg-orange-200 p-5 h-[450px] w-[300px] rounded-2xl shadow-md flex flex-col justify-between mt-36"
//           >
//             <img src={book.image} alt={book.B_Name} className="w-28 mx-auto mb-2" />
//             <h2 className="font-serif font-bold text-xl">{book.B_Name}</h2>
//             <p className="text-sm mt-2">{book.B_description}</p>
//             <p className="font-semibold mt-2">{book.B_author}</p>
//             <button className="text-white bg-orange-950 w-full rounded-2xl mt-4 py-2 hover:bg-orange-800">
//               Add To Collection
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewBooks;





// import { useEffect, useState } from "react";
// import Navbar from '../compontents/UserNavbar';

// const ViewBooks = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetch("api/getBook", { credentials: 'include' })
//       .then(res => res.json())
//       .then(data => setBooks(data.data));
//   }, []);

//   const handleAdd = (bookId) => {
//     fetch("api/addToCollection", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: 'include',
//       body: JSON.stringify({ bookId }),
//     })
//       .then(res => res.json())
//       .then(alert("Book added to collection"));
//   };

//   return (
//     <>
//      <Navbar />
//     <div className="bg-orange-50 min-h-screen pt-28 px-5 flex gap-5 flex-wrap">
//       {books.map(book => (
//         <div key={book.B_Id} className="bg-orange-200 p-5 h-[450px] w-[500px] rounded-2xl shadow-xl">
//           <img src={book.image} alt={book.B_Name} className="w-28" />
//           <h2 className="font-serif font-bold text-xl">{book.B_Name}</h2>
//           <p>{book.B_description.slice(0, 100)}...</p>
//           <button onClick={() => handleAdd(book.B_Id)}
//             className="text-white bg-orange-950 w-[150px] rounded-2xl mt-16 hover:text-orange-600">
//             Add to Collection
//           </button>
//         </div>
//       ))}
//     </div>
//     </>
//   );
// };

// export default ViewBooks;




import { useEffect, useState } from "react";
import Navbar from '../compontents/UserNavbar';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [collectionIds, setCollectionIds] = useState([]);

  useEffect(() => {
    fetch("api/getBook", { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBooks(data.data));

    // fetch collection to determine which books are already added
    fetch("api/getMyCollection", { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const ids = data.books.map(book => book.B_Id);
        setCollectionIds(ids);
      });
  }, []);

  const handleAdd = (bookId) => {
    fetch("api/addToCollection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({ bookId }),
    })
      .then(res => res.json())
      .then(() => {
        alert("Book added to collection");
        setCollectionIds(prev => [...prev, bookId]);
      });
  };

  return (
    <>
     <Navbar />
     <div className="bg-orange-50 min-h-screen pt-28 px-5 flex gap-5 flex-wrap">
      {books.map(book => {
        const isInCollection = collectionIds.includes(book.B_Id);

        return (
          <div key={book.B_Id} className="bg-orange-200 p-5 h-[450px] w-[500px] rounded-2xl shadow-xl">
            <img src={book.image} alt={book.B_Name} className="w-28" />
            <h2 className="font-serif font-bold text-xl">{book.B_Name}</h2>
            <p>{book.B_description.slice(0, 100)}...</p>

            {isInCollection ? (
              <button
                className="text-white bg-green-700 w-[150px] rounded-2xl mt-16 hover:bg-green-800"
                onClick={() => window.location.href = `/read/${book.B_Id}`}>
                Read
              </button>
            ) : (
              <button
                onClick={() => handleAdd(book.B_Id)}
                className="text-white bg-orange-950 w-[150px] rounded-2xl mt-16 hover:text-orange-600">
                Add to Collection
              </button>
            )}
          </div>
        );
      })}
    </div>
    </>
  );
};

export default ViewBooks;
