import { useEffect, useState } from "react";
import Navbar from "../compontents/Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("api/users", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemove = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`api/users${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete user");
        // Refresh the user list
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <>
    <Navbar/>
    <div className="mt-20 flex justify-center">
      <table className="border-2">
        <thead>
          <tr className="bg-orange-950">
            <th className="border-2 w-20 text-white h-16 border-black">Si No.</th>
            <th className="border-2 w-48 text-white h-16 border-black">User Name</th>
            <th className="border-2 w-48 text-white h-16 border-black">Phone</th>
            <th className="border-2 w-48 text-white h-16 border-black">Role</th>
            <th className="border-2 w-48 text-white h-16 border-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id} className="h-16 text-center">
                <td className="border-2 border-black">{index + 1}</td>
                <td className="border-2 border-black">{user.userName}</td>
                <td className="border-2 border-black">{user.Ph}</td>
                <td className="border-2 border-black">{user.userRole}</td>
                <td className="border-2 border-black">
                  <button
                    className="ml-2 w-20 bg-orange-950 rounded-xl text-white py-1"
                    onClick={() => handleRemove(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default UserList;
