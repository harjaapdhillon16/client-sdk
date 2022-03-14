import React, { useEffect } from "react";
import { parseLoginLink } from "./loginLinkUtils";
import { useLogin } from "./loginHook";

interface LoginButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  /* Gooddollar link */
  gooddollarlink: string;
  /* Login callback function */
  onLoginCallback: (prop?: any) => void;
  /* Redirect URL */
  rdu?: string;
  /* Callback URL */
  cbu?: string;
}

export const LoginButton = (props: LoginButtonProps): JSX.Element => {
  const { onLoginCallback, ...rest } = props;
  const onButtonClick = useLogin({
    rdu: rest.rdu,
    cbu: rest.cbu,
    gooddollarlink: rest.gooddollarlink,
    onLoginCallback: onLoginCallback,
  });

  return <button {...rest} onClick={onButtonClick} />;
};
