export const sampleObject = {
  v: "Google",
  web: "https://www.google.com",
  id: "0x09D2011Ca5781CA70810F6d82837648132762F9a",
  r: ["mobile", "location", "email", "name"],
  rdu: "http://localhost:3001/",
};

export const sampleLink =
  "http://wallet.gooddollar.org/AppNavigation/LoginRedirect?login=eyJ2IjoiR29vZ2xlIiwid2ViIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsImlkIjoiMHgwOUQyMDExQ2E1NzgxQ0E3MDgxMEY2ZDgyODM3NjQ4MTMyNzYyRjlhIiwicmR1IjoiaHR0cDovL2xvY2FsaG9zdDozMDAxLyIsInIiOlsibW9iaWxlIiwibG9jYXRpb24iLCJlbWFpbCIsIm5hbWUiXX0%3D";

export const sampleBase64EncodedString =
  "eyJ2IjoiR29vZ2xlIiwid2ViIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsImlkIjoiMHgwOUQyMDExQ2E1NzgxQ0E3MDgxMEY2ZDgyODM3NjQ4MTMyNzYyRjlhIiwicmR1IjoiaHR0cDovL2xvY2FsaG9zdDozMDAxLyIsInIiOlsibW9iaWxlIiwibG9jYXRpb24iLCJlbWFpbCIsIm5hbWUiXX0%3D";

export const sampleGooddollarSignedObject = {
  a: "0x9E6Ea049A281F513a2BAbb106AF1E023FEEeCfA9",
  v: true,
  I: "India",
  n: "Harjaap Dhillon",
  e: "harvydhillon16@gmail.com",
  m: "+918146851290",
  nonce: Date.now(),
  sig: {
    messageHash:
      "0x5f35dce98ba4fba25530a026ed80b2cecdaa31091ba4958b99b52ea1d068adad",
    v: "0x1c",
    r: "0xadbf6657ff309f9f25dddf72d2d04ec3b0af053b2db9121910f79ea82bce486e",
    s: "0x1db26ea639670fa1600ce862e209845e1d2a73ad7a4a4e858a80dfa33f79e0ef",
    signature:
      "0xadbf6657ff309f9f25dddf72d2d04ec3b0af053b2db9121910f79ea82bce486e1db26ea639670fa1600ce862e209845e1d2a73ad7a4a4e858a80dfa33f79e0ef1c",
  },
};

export const parsedResult = {
  walletAddrress: "0x9E6Ea049A281F513a2BAbb106AF1E023FEEeCfA9",
  isAddressWhitelisted: true,
  location: "India",
  fullName: "Harjaap Dhillon",
  email: "harvydhillon16@gmail.com",
  mobile: "+918146851290",
  nonce: Date.now()
};
