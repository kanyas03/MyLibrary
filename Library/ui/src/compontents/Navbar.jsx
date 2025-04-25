import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate(); // Hook to navigate after logout

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include', // Ensure cookies are included
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login page after successful logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-orange-950 h-16 flex justify-between fixed top-0 w-full px-5">
      <h1 className="text-white font-serif text-xl font-bold my-auto">My Library</h1>
      <div className="space-x-5 my-auto font-semibold">
        <Link to="/adminhome" className="text-white font-serif hover:text-xl">Home</Link>
        <Link to="/adminbook" className="text-white font-serif hover:text-xl">Books</Link>
        <Link to="/addbook" className="text-white font-serif hover:text-xl">Add Books</Link>
        <Link to="/userdetails" className="text-white font-serif hover:text-xl">User</Link>
        <button onClick={handleLogout} className="text-white font-serif hover:text-xl">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
