import React from "react";
import Navbar from "../compontents/UserNavbar";

const Home = () => {
  return (
    <div className="bg-fixed bg-cover min-h-screen" style={{ backgroundImage: "url(/adhomebook.jpg)" }}>
      <Navbar />
      <div className="mt-48 bg-orange-50 h-56 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-4xl font-bold font-serif">"I have found the most valuable thing in my wallet is my library card."</p>
        <p className="font-serif pt-4">_By Laura Bush</p>
        <div className="flex justify-center space-x-6 mt-5">
          <button className="flex items-center bg-stone-100 rounded-2xl w-[180px] h-[30px] px-2">
            <img src="/gmail-removebg-preview.png" alt="Gmail" className="size-6" />
            <span>&nbsp;SignUp with email</span>
          </button>
          <button className="flex items-center bg-stone-100 rounded-2xl w-[180px] h-[30px] px-2">
            <img src="/google-removebg-preview.png" alt="Google" className="size-6" />
            <span>&nbsp;SignUp with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
