import { AxiosResponse } from "axios";
import React, { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import { http } from "../../servives";

import cls from "./register.module.scss";

interface IRegister {
  success: boolean;
}
const Register: React.FC = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const body = {
      email,
      password,
    };

    const { data }: AxiosResponse<IRegister> = await http.post(
      "/auth/sign-up",
      body
    );

    await http.get(`/auth/verification-email/${email}`);

    console.log("success = ", data.success);
  };
  return (
    <div className={cls.register}>
      <form onSubmit={onSubmit}>
      <h1>Register</h1>
        <div>
          <p>
            <label htmlFor="email">Email</label>
          </p>
          <input className={cls.input}
            type="email"
            id="email"
            placeholder="Your Email"
            ref={emailRef}
          />
        </div>
        <div>
          <p>
            {" "}
            <label htmlFor="password">Password</label>
          </p>{" "}
          <input className={cls.input}
            type="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button>Submit</button>
      <p>
          Don't have an account yes? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
