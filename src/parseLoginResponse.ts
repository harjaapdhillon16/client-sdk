import Web3 from "web3";

interface ResponseType {
  //Wallet address
  a: string;
  //Is address whitelisted
  v: boolean;
  //Location i.e Country
  I: string;
  // Full Name
  n: string;
  //Email
  e: string;
  //Mobile
  m: string;
  //Timestamp of response
  nonce: number;
  //Signed object
  sig: any;
  //Error 
  error?:string;
}

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "WhitelistedAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addIdentityAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "did",
        type: "string",
      },
    ],
    name: "addWhitelistedWithDID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isIdentityAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "isWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "removeWhitelisted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_avatar",
        type: "address",
      },
    ],
    name: "setAvatar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const transformObject = (res: ResponseType) => ({
  walletAddrress: res.a,
  isAddressWhitelisted: res.v,
  location: res.I,
  fullName: res.n,
  email: res.e,
  mobile: res.m,
  nonce: res.nonce,
});

export const parseLoginResponse = async (response: ResponseType) => {
  if(response?.error){
    return response
  }
  const { sig, a, nonce, v } = response;
  const nonceNotToOld = Date.now() - nonce >= 300000;
  if (!nonceNotToOld) {
    const web3Instance = new Web3(
      new Web3.providers.HttpProvider("https://rpc.fuse.io/")
    );
    const userRecoveredWalletAddress = web3Instance.eth.accounts.recover({
      messageHash: sig.messageHash,
      v: sig.v,
      r: sig.r,
      s: sig.s,
    });
    if (userRecoveredWalletAddress === a) {
      const identityContract = new web3Instance.eth.Contract(
        abi as any,
        "0x7ccF1011610138b484fCc921858e7971342d213c",
        { from: a }
      );
      try {
        const isWhitelisted =
          v && (await identityContract.methods.isWhitelisted(a).call());
        return {
          ...transformObject(response),
          isWhitelisted,
          verifiedResponse: true,
        };
      } catch (e) {
        return { ...transformObject(response), verifiedResponse: false };
      }
    } else {
      return { ...transformObject(response), verifiedResponse: false };
    }
  } else {
    return { ...transformObject(response), verifiedResponse: false };
  }
};
