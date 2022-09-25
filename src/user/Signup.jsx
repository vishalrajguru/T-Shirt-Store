import React, { useState } from 'react';
import { Base } from '../core/Base';
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index"


const Signup = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  })
  const { name, email, password, error, success } = value;
  const handleOnchange = name => event => {
    setValue({
      ...value, error: false, [name]: event.target.value
    });
  };
  const onSubmit = event => {
    event.preventDefault();
    setValue({ ...value, error: false });
    signup({ name, email, password })
      .then(data => {
        console.log(data);
        if (data.error) {
          setValue({ ...value, error: data.error, success: false })
        } else {

          setValue({
            ...value,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });

        }
      }).catch("error in signup")

  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left"><div className="alert alert-success"
          style={{ display: success ? "" : "none" }}

        >
          New Account was created.Please <Link to="/signin">Login</Link>

        </div>
        </div>
      </div>
    )
  }
  const errorMessage = () => {
    return (<div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger"
          style={{ display: error ? "" : "none" }}

        >
          {error}
        </div>
      </div>
    </div>
    )
  }
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form method='POST'>
            <div className="form-group">
              <label className='text-light'>Name</label>
              <input className="form-control my-1" onChange={handleOnchange("name")} type="text" value={name} />
            </div>
            <div className="form-group">
              <label className='text-light'>Email</label>
              <input className="form-control" onChange={handleOnchange("email")} type="email" value={email} />
            </div>
            <div className="form-group">
              <label className='text-light'>Password</label>
              <input className="form-control" onChange={handleOnchange("password")} type="password" value={password} />
            </div>
            <button className="btn btn-success my-3 btn-block" onClick={onSubmit}>Submit</button>
          </form>

        </div>
      </div>
    )
  }
  return (
    <Base title='Sign up Page' description='A page for user to signing up!'>
      <div className="container">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className="text-white text-center">{JSON.stringify(value)}</p>

      </div>
    </Base>
  )
}
export default Signup;