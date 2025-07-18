import { useAuth } from "@/Context/AuthContext";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useAuth();
const [loading, setloading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      if (!email || !password) {
        setError("Both fields are required.");
        return;
      }
      setError("");
      await loginUser(email, password);
    } catch (error) {
      toast.error(error.message);
    }finally{
      setloading(false)

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <p className="text-xs text-gray-500 pb-2 text-center">
          Only For an ADMIN of GDG GCOEN
        </p>
        {error && (
          <div className="p-2 bg-red-100 text-center font-semibold text-red-500 text-sm mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ?"Loading...":"Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
