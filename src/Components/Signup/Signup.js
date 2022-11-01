import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { useHistory, Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {

  const history = useHistory()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const [validation, setValidation] = useState(null);


  const handlSubmit = (e)=>{
    e.preventDefault()
    if (username == "" || email == "" || password == "" || phone.length < 10 ) {
      e.preventDefault()
      setValidation('All Field are Required')
    }else{
      firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
        result.user.updateProfile({displayName: username}).then(()=>{
          firebase.firestore().collection('user').add({
            id: result.user.uid,
            username: username,
            phone: phone
          }).then(()=>{
            history.push("/login")
          }).catch((error) => {
            setValidation(error.message)
          })
        }).catch((error) => {
          setValidation(error.message)
        })
      }).catch((error) => {
        setValidation(error.message)
      })
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlSubmit}>
          <p className='validation'>{validation}</p>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
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
          <button type='onSubmit'>Signup</button>
        </form>
        <Link to="/login" >Login</Link>
      </div>
    </div>
  );
}
