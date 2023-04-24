import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../api";
import { AuthenticationContext } from '../../contexts/AuthenticationContext'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setSignedInUsername } = useContext(AuthenticationContext)

  const navigate = useHistory();

  useEffect(() => {
    sessionStorage.clear();
    setSignedInUsername(null)
  }, []);

  const ProceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      api
        .get(`users/${username}`)
        .then((response) => {
          if (response.data.password === password) {
            sessionStorage.setItem('bonik-shop-user', username);
            setSignedInUsername(username)
            navigate.push('/')
          } else {
            alert('Please Enter valid credentials!')
          }
        })
        .catch(() => {
          alert('Please Enter valid credentials!')
        })
    }
  }

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      alert('Please Enter Username')
    }
    if (password === '' || password === null) {
      result = false;
      alert('Please Enter Password')
    }
    return result;
  }

  return (
    <form onSubmit={ProceedLogin} className="container mtop" style={{ textAlign: "center" }}>
      <div className="card-header mbottom">
        <h2>User Login</h2>
      </div>
      <div className="form-group">
        <label>Username <span className="errmsg">*</span></label>
        <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
      </div>
      <div className="form-group mbottom">
        <label>Password <span className="errmsg">*</span></label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
      </div>

      <button type="submit" className="btn btn-primary" style={{ marginRight: '25px', cursor: "pointer" }}>Login</button>
      <Link className="btn btn-success navigate-url" to={'/register'}>New User</Link>
    </form>
  );
}

export default Login;
