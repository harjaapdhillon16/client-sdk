import Web3 from "web3";
import ContractsAddress from "@gooddollar/goodprotocol/releases/deployment.json";
import IdentityABI from "@gooddollar/goodprotocol/artifacts/contracts/Interfaces.sol/IIdentity.json";
import { env } from "process";

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
  error?: string;
}

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
  if (response?.error) {
    return response;
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
        IdentityABI.abi as any,
        (ContractsAddress as any)[env?.REACT_APP_NETWORK ?? "fuse"].Identity,
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
