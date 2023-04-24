import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../api";

const Register = () => {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("india");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");

  const navigate = useHistory();

  async function createUser() {

    let regobj = { id: username, name, password, email, phone: phoneNumber, country, address, gender };

    await api.post('users', JSON.stringify(regobj), {
      headers: {
        "Content-Type": 'application/json'
      }
    })

    alert('Register complete successfully')
    navigate.push('/sign-in');
  }

  const IsValidate = () => {
    let isValid = true;
    let errorMessage = 'Please enter the value in ';
    if (username === null || username === '') {
      isValid = false;
      errorMessage += ' Username';
    }
    if (name === null || name === '') {
      isValid = false;
      errorMessage += ' Fullname';
    }
    if (password === null || password === '') {
      isValid = false;
      errorMessage += ' Password';
    }
    if (email === null || email === '') {
      isValid = false;
      errorMessage += ' Email';
    }

    if (!isValid) {
      alert(errorMessage)
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      isValid = false
      alert('Please enter the valid emai')
    }
    return isValid;
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    if (IsValidate()) {
      api
        .get(`users/${username}`)
        .then(() => {
          alert(`Username ${username} is already in used`)
        })
        .catch(createUser)
    }
  }

  return (
    <form className="container mtop" onSubmit={handlesubmit} style={{ textAlign: "center" }}>
      <div className="card-header">
        <h1>User Registration</h1>
      </div>
      <div className="form-group">
        <label>Username <span className="errmsg">*</span></label>
        <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Password <span className="errmsg">*</span></label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Full Name <span className="errmsg">*</span></label>
        <input value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Email <span className="errmsg">*</span></label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Phone <span className="errmsg"></span></label>
        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Country <span className="errmsg">*</span></label>
        <select value={country} onChange={e => setCountry(e.target.value)} className="form-control">
          <option value="vietnam">VietNam</option>
          <option value="usa">USA</option>
        </select>
      </div>
      <div className="form-group">
        <label>Address</label>
        <textarea value={address} onChange={e => setAddress(e.target.value)} className="form-control" style={{ resize: "none" }}></textarea>
      </div>
      <div className="form-group">
        <label>Gender</label>
        <br></br>
        <input type="radio" checked={gender === 'male'} onChange={e => setGender(e.target.value)} name="gender" value="male" className="app-check"></input>
        <label htmlFor="gender">Male</label>
        <input type="radio" checked={gender === 'female'} onChange={e => setGender(e.target.value)} name="gender" value="female" className="app-check"></input>
        <label htmlFor="gender">Female</label>
      </div>
      <button type="submit" className="btn btn-primary" style={{ marginRight: '25px', cursor: 'pointer' }}>Register</button>
      <Link className="btn btn-success navigate-url" to={'/login'}>Already have account?</Link>
    </form>
  );
}

export default Register;
