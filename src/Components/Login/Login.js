import React,{useState, useContext} from 'react';
import { FirebaseContext } from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory, Link} from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext)
  const history = useHistory()
  const [validation, setValidation] = useState(null);
  const handleLogin = (e)=>{
  
    
    if (email == "" || password == "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      e.preventDefault()
      setValidation('Email and Password is Required')
    }else{
      e.preventDefault()
      setValidation('')
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        history.push('/')
      }).catch((error) => {
        setValidation(error.message) 
      })
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <p className='validation'>{validation}</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
