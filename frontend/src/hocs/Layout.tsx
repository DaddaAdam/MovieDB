import { NavBar } from "../components/NavBar";
import { UserContext } from "../components/userContext";
import React, { useEffect, useState, useContext } from "react";

type props = {
  children?: JSX.Element | JSX.Element[];
};

export const Layout = (props: props) => {
  const { user, setUser } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState();

  const getUserInfo = async () => {
    if (!user) {
      const res = await fetch(
        `${
          process.env.REACT_APP_API_URL
        }/accounts/get-user-details/${localStorage.getItem("email")}/`
      );
      const data = await res.json();
      setUserInfo(data);
      setUser(data);
      console.log(data);
    }
  };
  useEffect(() => {
    getUserInfo();
  });

  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};
