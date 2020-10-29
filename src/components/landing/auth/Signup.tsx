import React from 'react';
import { useForm } from 'react-hook-form';

// Declare the type of data that will be handled in onSubmit function
type RegisterNewUser = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, errors } = useForm<RegisterNewUser>();

  return (
    <form action="/register" method="POST">
      <div className="field">
        <label htmlFor="email">
          Email
          <input
            ref={register({ required: true })}
            type="text"
            id="email"
            name="email"
            placeholder="Email address"
          />
          {errors.email && <div className="error">Enter Your Email</div>}
        </label>
      </div>
      <div className="password">
        <label htmlFor="password">
          Password
          <input
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
        <label htmlFor="verification-code">
          Enter Verification Code
          <input
            type="text"
            id="verification"
            name="verification-code"
            placeholder="Enter verification code"
          />
          {errors.name && <div className="error">Enter a valid verfication code</div>}
        </label>
      </div>
      <button type="submit">Start Swapping</button>
      <a href="/login">Already registered? Login here</a>
    </form>
  );
};

export default SignUp;
