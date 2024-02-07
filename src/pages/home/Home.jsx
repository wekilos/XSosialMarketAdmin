import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import { Context } from "../../context/context";
import lang from "../../lang/home.json";

const Home = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const path = useLocation();

  return <div></div>;
};

export default Home;
