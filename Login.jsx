import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/"); 
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-800">
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl text-center font-bold text-orange-600 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input-field mb-4 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field mb-6 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full mb-4 py-2 px-6 bg-gradient-to-r from-orange-500 to-orange-800 text-white font-semibold rounded-lg hover:bg-orange-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-neutral-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-orange-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;