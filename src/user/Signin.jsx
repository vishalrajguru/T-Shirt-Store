import React, { useState } from 'react';
import { Base } from '../core/Base';
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false

  })
  const { email, password, error, loading, didRedirect, success } = values
  const { user } = isAuthenticated();
  const handleOnchange = name => event => {
    setValues({
      ...values, error: false, [name]: event.target.value
    });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info" >
          Loading.......
        </div>
      )
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
  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values, error: false, loading: true
    })
    signin({ email, password })
      .then(data => {
        // console.log(data.json);
        if (data.error) {
          setValues({
            ...values, error: data.error, loading: false
          })
        } else {
          authenticate(data, () => {
            setValues({
              ...values, didRedirect: true
            })
          })
        }
      }
      ).catch(console.log("sign in failed"));
  }
  const performRedirect = () => {
    if (didRedirect) {
      console.log(user);
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"/> 
      } else {
        return <Redirect to="/user/dashboard"/>
      } 
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  }
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form >

            <div className="form-group my-3">
              <label className='text-light'>Email</label>
              <input className="form-control" type="email" onChange={handleOnchange("email")} values={email} />
            </div>
            <div className="form-group my-3">
              <label className='text-light'>Password</label>
              <input className="form-control" type="password" onChange={handleOnchange("password")} values={password} />
            </div>
            <button onClick={onSubmit} className="container btn btn-success my-4 btn-block">Sign In</button>
          </form>

        </div>
      </div>
    )
  }
  return (
    <Base title='Sign in Page' description='A page for user to signing in!'>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  )
}
export default Signin;