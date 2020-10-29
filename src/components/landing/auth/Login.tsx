import React from 'react';
import { useForm } from 'react-hook-form';

// Declare the type of data that will be handled in onSubmit function
type LoginExistingUser = {
  email: string;
  password: string;
};

const Login = () => {
  const { errors } = useForm<LoginExistingUser>();

  return (
    <form action="/login" method="POST">
      <div className="field">
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email address"
          />
          {errors.email && <div className="error"> Enter A Valid Email </div>}
        </label>
      </div>
      <div className="password">
        <label htmlFor="password">
          Enter A Valid Password
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Create Password"
          />
          {errors.password && <div className="error">Enter A Valid Password </div>}
        </label>
      </div>
      <button type="submit">Start Swapping</button>
      <a href="/login">Have a verification code? Sign Up Here</a>
    </form>
  );
};
export default Login;
