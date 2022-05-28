import React from "react";
import { NavBar } from "../components/NavBar";

type props = {
  children?: JSX.Element | JSX.Element[];
};

export const Layout = (props: props) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};
