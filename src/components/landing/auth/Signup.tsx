import React from 'react';
import { useForm } from 'react-hook-form';

// Declare the type of data that will be handled in onSubmit function
type UserLogin = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, handleSubmit, errors } = useForm<UserLogin>();

  return (
    <form action="/register" method="POST">
      <div className="field">
        <label htmlFor="name">
          Your Name
          <input
            ref={register({ required: true })}
            type="text"
            id="name"
            name="name"
            placeholder="Enter username"
          />
          {errors.name && <div className="error">Enter Your Name</div>}
        </label>
      </div>
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
      <button type="submit">Start Swapping</button>
      <a href="/users/login">Already registered? Login here</a>
    </form>
  );
};

export default SignUp;
