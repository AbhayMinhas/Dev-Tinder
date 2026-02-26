import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user && isLoginForm) {
      navigate("/");
    }
  }, [user, navigate, isLoginForm]);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoginForm ? handleLogin() : handleSignUp();
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-base-200 to-base-300 px-4 pt-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {isLoginForm ? "Welcome Back" : "Join Dev-Tinder"}
          </h1>
          <p className="text-base-content/70">
            {isLoginForm
              ? "Connect with developers worldwide"
              : "Start your developer networking journey"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields - Only for Signup */}
            {!isLoginForm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full focus:input-primary transition-all"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full focus:input-primary transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full focus:input-primary transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full focus:input-primary transition-all"
                placeholder="••••••••"
                required
              />
              {isLoginForm && (
                <label className="label">
                  <span className="label-text-alt link link-hover text-primary">
                    Forgot password?
                  </span>
                </label>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full text-lg ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : isLoginForm ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OR</div>

          {/* Toggle Form */}
          <div className="text-center">
            <p className="text-base-content/70">
              {isLoginForm ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsLoginForm((value) => !value);
                  setError("");
                }}
                className="link link-primary font-semibold ml-2"
              >
                {isLoginForm ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-base-content/60">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="link link-hover">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="link link-hover">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
