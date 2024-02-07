import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { Context } from "../../context/context";
import loginImg from "../../images/login.svg";
import { axiosInstance } from "../../utils/axiosIntance";

const Login = () => {
  const [passType, setPassType] = useState("password");
  const history = useHistory();
  const { dil } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axiosInstance
      .post("/login", {
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data.data);
        if (data.data?.token) {
          localStorage.setItem("userData", JSON.stringify(data.data));
          history.push({ pathname: "/home" });
        } else {
          console.log("eeeeeeee");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="max-h-[100vh] w-full flex justify-between">
      <div className="w-fit pl-[60px] h-[100vh] flex flex-col justify-around">
        <div className="flex gap-4  items-center">
          <div className="bg-[#0075FF] w-[50px] h-[50px] rounded-[100%] text-white font-[900] leading-[50px] text-center text-[25px]">
            X
          </div>
          <div className="text-[24px] font-[500] text-blck">X SMarketplace</div>
        </div>

        <div className="">
          <h1 className="text-[40px] font-[500] text-black">Salam!</h1>
          <p className="text-[28px] font-[400]">
            Dolandyryş panela hoş geldiňiz
          </p>
        </div>

        <div>
          <div className="w-[400px] flex flex-wrap gap-1">
            <label className="text-[16px]  font-[500]" htmlFor="phone">
              Ulanyjy ady ýa-da telefon nomer
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="phone"
              name="phone"
              className="px-4 text-[#98A2B2] text-[16px] font-[400] h-[50px] w-[400px] rounded-[6px] border-[1px] border-[#98A2B2] outline-none"
              type="text"
              placeholder="Giriz"
            />
          </div>

          <div className="w-[400px] mt-4 flex flex-wrap gap-1">
            <label className="text-[16px]  font-[500]" htmlFor="password">
              Açar sözi
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              className="px-4 text-[#98A2B2] text-[16px] font-[400] leading-[50px] h-[50px] w-[400px] rounded-[6px] border-[1px] border-[#98A2B2] outline-none"
              type="password"
              placeholder="*********"
            />
          </div>

          <button
            onClick={() => login()}
            className=" text-white text-[16px] mt-[30px] bg-blue font-[500] leading-[50px] h-[50px] w-[400px] rounded-[8px] "
          >
            Ulgama gir
          </button>
        </div>

        <div className="text-[16px] font-[500] text-[#98A2B2] w-[350px]">
          Açar sözi we admin maglumatlary üýtgetmek üçin super admina ýüz tutuň.
        </div>
      </div>
      <div className="h-[100vh] w-fit bg-red">
        <img className="h-[100vh] object-contain" src={loginImg} alt="" />
      </div>
    </div>
  );
};
export default Login;
