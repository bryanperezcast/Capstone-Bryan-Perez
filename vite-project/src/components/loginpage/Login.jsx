import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { BiUser } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { AiOutlineLock } from 'react-icons/ai'
import UserFilter from '../userFilter'

function Login(props) {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedLogin] = useState('success')
  const [curUser, setCurUser] = useState(null);
  const userId = props.userId
  const setUserId = props.setUserId

  const loginUser = () => {
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        navigate(`/Home`);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setFailedLogin("failed")
      });
    setAction("Login");
  };
//used to gab the logged in users id
  useEffect(() => {
    async function renderUser() {
      try {
        const response = await fetch(`https://fakestoreapi.com/users`);
        const result = await response.json();
        const filteredUsers = result.filter(user => user.username === username);
        if (filteredUsers.length > 0) {
          const item = filteredUsers[0];
          setCurUser(item.id);
          setUserId(item.id)
        } else {
        }
      } catch (err) {
        console.error(err);
      }
    }
    renderUser();
  }, [username]);
//handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  }
//will change the state of action and failed login 
  function changeClassName() {
    setAction("Sign Up")
    setFailedLogin("success")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <div className='header'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          {action === "Login" ? <div></div> : 
          <div className='input'>
            <BiUser />
            <input type='text' placeholder='name'/>
          </div>}
          <div className='input'>
            <AiOutlineMail />
            <input value={username} onChange={(e) => setUserName(e.target.value)} placeholder='username'/>
          </div>
          <div className='input'>
            <AiOutlineLock />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
          </div>
        </div>
        <div className='submit-container'>
          <div className={action === "Login" ? "submit grey" : "submit"} onClick={() => {changeClassName()}}>Sign Up</div>
          <button type='submit' className={action === "Sign Up" ? "submit grey" : "submit"} onClick={() => {loginUser()}}>Login</button>
        </div>
        <div className={failedLogin}>username or password is incorect</div>
      </div>
    </form>
  )
}

export default Login;