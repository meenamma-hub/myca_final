import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../../services/authService";
import { initializeDemoData } from "../../services/seedService";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    initializeDemoData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const result = authenticate(email, password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    const user = result.user;

    if (user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else if (user.role === "jointSecretary") {
      navigate("/joint/dashboard", { replace: true });
    } else {
      // Student login follows the intended onboarding flow:
      // Sign In -> Welcome -> Description -> Student Dashboard.
      navigate("/welcome", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-2">Sign In</h1>

        <p className="text-center text-gray-500 mb-6">
          MYCA Event Management System
        </p>

        <input
          type="email"
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-3 rounded mb-5"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded"
        >
          Sign In
        </button>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
