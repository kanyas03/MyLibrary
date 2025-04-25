import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/image/aimg4.jpeg';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    userRole: "User", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      UserName: formData.userName,
      PhoneNumber: formData.phoneNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      UserRole: formData.userRole,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-fixed" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="bg-orange-200 w-[450px] h-auto p-10 rounded-3xl shadow-2xl">
        <h1 className="text-center font-serif font-bold text-4xl">Sign Up</h1>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" className="w-full border-2 p-2" onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" className="w-full border-2 p-2" onChange={handleChange} required />
          <input type="text" name="userName" placeholder="Username" className="w-full border-2 p-2" onChange={handleChange} required />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" className="w-full border-2 p-2" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full border-2 p-2" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full border-2 p-2" onChange={handleChange} required />
          <select name="userRole" className="w-full border-2 p-2" onChange={handleChange} required>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" className="bg-orange-950 text-white p-2 rounded-xl w-full hover:bg-orange-700">Sign Up</button>
        </form>
        <div className="text-center mt-4">
          <p>Already have an account? <a href="/login" className="text-orange-950 hover:text-orange-600">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
