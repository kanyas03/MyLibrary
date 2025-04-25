import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  // ✅ Fix: Defined handleChange function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestData = {
      UserName: formData.userName, // ✅ Backend expects "UserName" (capital U)
      password: formData.password,
    };

    try {
      const response = await fetch("api/login", { // ✅ Correct API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate(data.userRole === "Admin" ? "/adminHome" : "/userhome");
      } else {
        alert(data); // Display server error message
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-fixed" style={{ backgroundImage: "url('/aimg2.jpeg')" }}>
      <div className="bg-orange-200 w-[450px] h-auto p-10 rounded-3xl shadow-2xl">
        <h1 className="text-center font-serif font-bold text-4xl">Login</h1>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <input type="text" name="userName" placeholder="Username" className="w-full border-2 p-2" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full border-2 p-2" onChange={handleChange} required />
          <button type="submit" className="bg-orange-950 text-white p-2 rounded-xl w-full hover:bg-orange-700">Login</button>
        </form>
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-orange-950 hover:text-orange-600">Forgot password?</a>
        </div>
        <div className="text-center mt-4">
          <p>Don't have an account? <a href="/" className="text-orange-950 hover:text-orange-600">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
