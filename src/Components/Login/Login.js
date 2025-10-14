import "./Login.css";
import  { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom"; // use Link instead of <a> for SPA routing
import { API_URL } from "../../config";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  const validate = () => {
    const newErrors = {};




    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    return newErrors;
  };

    // Function to handle login form submission
    const login = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData?.email,
            password: formData?.password,
          }),
        });
        // Parse the response JSON
        const json = await res.json();
        if (json.authtoken) {
          // If authentication token is received, store it in session storage
          sessionStorage.setItem('auth-token', json.authtoken);
          sessionStorage.setItem('email', formData?.email);
          // Redirect to home page and reload the window
          navigate('/');
          window.location.reload();
        } else {
          // Handle errors if authentication fails
          if (json.errors) {
            for (const error of json.errors) {
              alert(error.msg);
            }
          } else {
            alert(json.error);
          }
        }
      };


  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>

        <div className="login-text">
          Are you a new member?{" "}
          <Link to="/Sign_Up" style={{ color: "#2190ff" }}>
            Sign Up Here
          </Link>
        </div>

        <br />

        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <i
                  className={`fa ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } password-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => {
                    setFormData({ email: "", password: "" });
                    setErrors({});
                }}
              >
                Reset
              </button>
            </div>

            <br />
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
}
