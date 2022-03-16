# GoodDollar Client SDK
This is the gooddollar client sdk for integrating login into gooddollar in your website
- [Example App](https://gooddollar.netlify.app/) to test the functionality
export { createLoginLink, parseLoginLink } from "./loginLinkUtils";
export { LoginButton } from "./loginButton";
export { parseLoginResponse } from "./parseLoginResponse";
export { useLogin } from "./loginHook";

## SDK Utilities
 - ### createLoginLink to generate login link to redirect to the gooddollar wallet 
 - ### LoginButton to place a login button on your page to integrate login with gooddollar on your website
 - ### parseLoginResponse to verify if the login was successful and verified
 - ### useLogin feature is a hook that can be used instead of button to integrate login with gooddollar on your website
