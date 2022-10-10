import React from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLoginAPI } from "./authSlice";
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChange = (e) => setEmail(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);

  const doSubmit = (e) => {
    e.preventDefault();
    dispatch(authLoginAPI({ email, password }));
    setEmail('')
    setPassword('')
  };
  return (
      <div className="Auth-form-container">
        {authState.em}
        <div className="message">
          {authState.isLoginPending &&
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          {authState.isLoginSuccess && <span>login success</span>}
          {authState.errorMassage && <span>{authState.errorMassage}</span>}
        </div>
        <form className="Auth-form" onSubmit={doSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login Form</h3>
            <div className="form-group mt-3">
              <label>Alamat Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Masukkan Email"
                onChange={emailChange}
                value={email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Masukkan Password"
                onChange={passwordChange}
                value={password}
              />
            </div>
            <div className="d-grid gap-2 mt-3 mb-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
  )
}