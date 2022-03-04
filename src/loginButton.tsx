import React, { useEffect } from "react";
import { parseLoginLink } from "./loginLinkUtils";

interface LoginButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  /* Login callback function */
  onLoginCallback: (prop?: any) => void;
  /* Redirect URL */
  rdu?: string;
  /* Callback URL */
  cbu?: string;
}

export const LoginButton = (props: LoginButtonProps): JSX.Element => {
  const { onLoginCallback, children, ...rest } = props;

  const onClick = () => {
    if (rest?.rdu && typeof rest?.rdu === "string" ) {
      window.location.href = rest?.rdu;
    } else if (rest?.cbu) {
      const windowObj = window.open(
        rest?.cbu,
        "_blank",
        "width=400,height=500,left=100,top=200"
      );
      windowObj?.addEventListener("unload", onLoginCallback);
    } else {
      throw new Error(
        "Please provide either a callback url or redirect URL to the component"
      );
    }
  };

  useEffect(() => {
    if (window.location.href.includes("?login=")) {
      const loginURI = window.location.href.split("=");
      onLoginCallback(parseLoginLink(loginURI[1]));
    }
  }, []);

  return <button {...rest} onClick={onClick} />;
};
