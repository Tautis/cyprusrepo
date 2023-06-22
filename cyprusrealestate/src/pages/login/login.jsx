import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { useSignIn } from 'react-auth-kit';

function Login() {
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL})

const [error, setError] = useState();

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const signIn = useSignIn();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axiosInstance.post("/auth/login", inputs);
      

      signIn({
        token:response.data.token,
        expiresIn:3600,
        tokenType:"Bearer",
        authState:{usernaem:inputs.username}
      })
      
      navigate("/");
    } catch (err) {
      console.log(err)
      setError(err.response.data);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p className='error'>{error}</p>}
      <form>
        <div className='loginform'>
          <input required type='text' placeholder='username' name='username' onChange={handleChange} />
          <input required type='password' placeholder='password' name='password' onChange={handleChange} />
          <button onClick={handleSubmit}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;