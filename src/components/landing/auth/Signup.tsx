import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';

// Declare the type of data that will be handled in onSubmit function
type RegisterNewUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, errors } = useForm<RegisterNewUser>();

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <form action="/auth/register" method="POST">
            <div className="form-group align-center my-5">
              <label htmlFor="first-name">
                First Name
                <input
                  className="form-control my-3"
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder="Enter your first name"
                />
                {errors.first_name && <div className="error">Enter Your First Name</div>}
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="last-name">
                Last Name
                <input
                  className="form-control my-3"
                  type="text"
                  id="last-name"
                  name="last-name"
                  placeholder="Enter your last name"
                />
                {errors.last_name && <div className="error">Enter Your Last Name</div>}
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="email">
                Email
                <input
                  className="form-control my-3"
                  ref={register({ required: true })}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email address"
                />
                {errors.email && <div className="error">Enter Your Email</div>}
              </label>
            </div>
            <div className="form-group align-center">
              <label htmlFor="password">
                Password
                <input
                  className="form-control my-3"
                  ref={register({ required: true })}
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Create Password"
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
              >
                Register
              </button>
              <br />
              <a href="/login">Already registered? Login here</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
