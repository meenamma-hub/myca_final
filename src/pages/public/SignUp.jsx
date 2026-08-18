import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addUser } from "../../services/userService";

function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );

    if (existingUser) {
      alert("Email already registered!");
      return;
    }

    // Create Student Account
    const newUser = {
      id: Date.now(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: "student",
      club: null,
      active: true,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Student account created successfully!");

    navigate("/SignIn");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-[400px]"
      >

        <h1 className="text-3xl font-bold text-center mb-2">
          Student Sign Up
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your MYCA student account
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-3 mb-4 outline-none focus:border-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="College Email"
          value={user.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-3 mb-4 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
          className="w-full border rounded p-3 mb-5 outline-none focus:border-blue-500"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 mb-5">
          <strong>Note:</strong>
          <br />
          This signup page is only for students.
          <br />
          Joint Secretary and Admin accounts are created by the Admin.
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          Create Account
        </button>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?
          <span
            onClick={() => navigate("/SignIn")}
            className="text-blue-600 cursor-pointer font-semibold ml-1"
          >
            Sign In
          </span>
        </p>

      </form>

    </div>
  );
}

export default SignUp;