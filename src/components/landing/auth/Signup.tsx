import React from "react";
import { useForm } from "react-hook-form";

// Declare the type of data that will be handled in onSubmit function
type UserLogin = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, handleSubmit, errors } = useForm<UserLogin>();

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          ref={register({ required: true })}
          type="text"
          id="email"
          name="email"
        />
        {errors.email && <div className="error">Enter Your Email</div>}
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <input
          ref={register({ required: true })}
          type="text"
          id="password"
          name="password"
        />
        {errors.password && <div className="error">Enter Your Password</div>}
      </div>
      <button type="submit">Start Swapping</button>
    </form>
  );
};

export default SignUp;
