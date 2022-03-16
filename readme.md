# GoodDollar Client SDK
This is the gooddollar client sdk for integrating login into gooddollar in your website
- [Example App](https://gooddollar.netlify.app/) to test the functionality

## SDK Utilities
 - { createLoginLink } to generate login link to redirect to the gooddollar wallet 
 - { LoginButton } to place a login button on your page to integrate login with gooddollar on your website
 - { parseLoginResponse } to verify if the login was successful and verified
 - { useLogin } feature is a hook that can be used instead of button to integrate login with gooddollar on your website

## example login with hook
```js
import {
  useLogin,
  createLoginLink,
  parseLoginResponse,
} from "client-sdk-gooddollar";

const App() {
  const gooddollarLink = createLoginLink({
    v: "Google",
    web: "https://gooddollar.netlify.app",
    id: "0x09D2011Ca5781CA70810F6d82837648132762F9a",
    r: ["mobile", "location", "email", "name"],
    rdu: "https://gooddollar.netlify.app",
  });

  const loginCallBack = async (data) => {
    //to check if login response is valid or not 
    parseLoginResponse(data)
  }

  const onClick =  useLogin({
    rdu: gooddollarLink,
    gooddollarlink: rest.gooddollarlink,
    onLoginCallback: onLoginCallback,
  });

  return (
    <div className="App">
      <button onClick={onClick}>Login With Gooddollar</button>
    </div>
  );
}
```

## example login with button
```js
import {useState} from 'react';
import {
  LoginButton,
  createLoginLink,
  parseLoginResponse,
} from "client-sdk-gooddollar";

function App() {
  const gooddollarLink = createLoginLink({
    v: "Google",
    web: "https://gooddollar.netlify.app",
    id: "0x09D2011Ca5781CA70810F6d82837648132762F9a",
    r: ["mobile", "location", "email", "name"],
    rdu: "https://gooddollar.netlify.app",
  });

  const [gooddollarData, setGooddollarData] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{ width: 200, height: 50, objectFit: "contain" }}
          src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.gooddollar.org/wp-content/uploads/2020/05/logo.png"
          className="App-logo"
          alt="logo"
        />
        {Object.keys(gooddollarData).length === 0 ? (
          <>
            <LoginButton
              onLoginCallback={async (data) => {
              //to check if login response is valid or not 
              parseLoginResponse(data)
              setGooddollarData(data)
              }}
              gooddollarlink={gooddollarLink}
              style={{ fontSize: 20, padding: 20 }}
              rdu="gasdasd"
            >
              Loggin With GOODDOLLAR
            </LoginButton>
          </>
        ) : (
          <div>
            <p>Logged In</p>
            <p>Name : {gooddollarData.fullName}</p>
            <button
              onClick={() => {
                setGooddollarData({});
                window.location.href = "https://gooddollar.netlify.app";
              }}
              style={{ fontSize: 20, padding: 20 }}
            >
              Logout
            </button>
          </div>
        )}
      </header>
    </div>
  );
}
```