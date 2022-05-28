import React from "react";
import { Search } from "../containers/Search";
import { NavBar } from "../components/NavBar";

type props = {
  children?: JSX.Element | JSX.Element[];
};

export const Layout = (props: props) => {
  return (
    <>
      <NavBar />
      <Search />
      {props.children}
    </>
  );
};
