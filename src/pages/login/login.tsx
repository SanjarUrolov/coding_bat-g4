import React, { FormEventHandler } from "react";
import cls from "./login.module.scss";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { http } from "../../servives";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth";

let stl = { color: "white", fontSize: "2rem", margin: "0 8px 0 10px" };


const Login: React.FC = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value!;
    const password = passwordRef.current?.value;

    const body = {
      email,
      password,
    };

    const { accessToken } = (await http.post("/auth/sign-in", body)).data.data;

    localStorage.setItem("accessToken", accessToken);
    dispatch(login({ email, accessToken }));
    navigate("/");
  };

  
  return (
    <div className={cls.wrapper}>
      <div className={cls.wrapper2}>
        <form className={cls.form} onSubmit={onSubmit}>
              <label htmlFor="email">Email</label>
          <div className={cls.inputBox}>
            <AiOutlineUser style={stl} />
            <p>
              {" "}
            </p>{" "}
            <input
              className={cls.input}
              type="email"
              id="email"
              placeholder="Your Email"
              ref={emailRef}
            />{" "}
            <AiOutlineEyeInvisible style={{ fontSize: "2rem", opacity: "0" }} />
          </div>

          <div className={cls.inputBox}>
            <AiOutlineLock style={stl} />
            <input
              className={cls.input}
              type="password"
              id="password"
              placeholder="Your Password"
              ref={passwordRef}
            />
            <AiOutlineEyeInvisible style={stl} />
          </div>
          <p>Need help login in ?</p>
          <div className={cls.inputBox}>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
