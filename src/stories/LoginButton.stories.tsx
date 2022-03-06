import React from "react";
import { LoginButton } from "../loginButton";

export default {
  title: "LoginButton",
};

export const Primary = () => (
  <LoginButton rdu="https://google.com" onLoginCallback={() => {}}>Redirect</LoginButton>
);

export const Secondary = () => (
  <LoginButton cbu="https://google.com" onLoginCallback={() => {}}>Callback</LoginButton>
);
