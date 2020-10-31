import React, { useState, SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';
import { Link, Redirect } from 'react-router-dom';
import user from '../../../../server/db/Models/user';

// Declare the type of data that will be handled in onSubmit function
type RegisterNewUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { errors } = useForm<RegisterNewUser>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setAuth] = useState<boolean>(false);

  const onSubmitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('hello2');
    try {
      const body = {
        firstName, lastName, email, password,
      };
      const response = await fetch('http://localhost:3000/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      console.log('ln 39');

      const parseRes = await response.json();
      console.log('ln 41');
      console.log(parseRes);
      if (parseRes.jwtToken) {
        console.log(parseRes.jwtToken);
        localStorage.setItem('token', parseRes.jwtToken);
        setAuth(true);
        toast.success('Registered successfullly!');
      } else {
        console.log('no token');
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center my-5">Register</h1>
        <div className="row justify-content-center">
          <form>
            <div className="form-group align-center my-5">
              <label htmlFor="first-name">
                First Name
                <input
                  className="form-control my-3"
                  type="text"
                  name="first-name"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="error">Enter Your First Name</div>}
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="last-name">
                Last Name
                <input
                  className="form-control my-3"
                  type="text"
                  name="last-name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="error">Enter Your Last Name</div>}
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="email">
                Email
                <input
                  className="form-control my-3"
                  type="text"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="error">Enter Your Email</div>}
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="password">
                Password
                <input
                  className="form-control my-3"
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="error">Enter Your Password</div>}
              </label>
            </div>
            <div className="field">
              {/* <label htmlFor="verification-code">
            Enter Verification Code
            <input
              type="text"
              id="verification"
              name="verification-code"
              placeholder="Enter verification code"
            />
            {errors.name && <div className="error">Enter a valid verfication code</div>}
          </label> */}
            </div>
            <div className="form-group align-center">
              <button
                className="btn btn-success btn-block"
                type="submit"
                onClick={onSubmitForm}
              >
                Register
              </button>
              <br />
              <a href="/login">Already registered? Login here.</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
