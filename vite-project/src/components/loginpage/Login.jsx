import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate();

  function LoginBtn () {
    const path = `/Home`
    navigate(path);
    console.log("clicked")
  }
  
    return (
      <div>
        <h1>Login</h1>
        <button onClick={LoginBtn}>Logged In</button>
      </div>
    )
  }
  
  export default Login