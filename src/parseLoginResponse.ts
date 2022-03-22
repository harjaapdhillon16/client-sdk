import Web3 from "web3";
import ContractsAddress from "@gooddollar/goodprotocol/releases/deployment.json";
import IdentityABI from "@gooddollar/goodprotocol/artifacts/contracts/Interfaces.sol/IIdentity.json";
import { env } from "process";

interface ResponseType {
  //Wallet address
  a: { value: string; attestation: string };
  //Is address whitelisted
  v: { value: boolean; attestation: string };
  //Location i.e Country
  I: { value: string; attestation: string };
  // Full Name
  n: { value: string; attestation: string };
  //Email
  e: { value: string; attestation: string };
  //Mobile
  m: { value: string; attestation: string };
  //Timestamp of response
  nonce: { value: number; attestation: string };
  //Signed object
  sig: any;
  //Error
  error?: string;
}

export const parseLoginResponse = async (response: ResponseType) => {
  const transformObject = (res: ResponseType) => ({
    walletAddrress: { value: res.a, isVerified: false },
    isAddressWhitelisted: { value: res.v, isVerified: false },
    location: { value: res.I, isVerified: false },
    fullName: { value: res.n, isVerified: false },
    email: { value: res.e, isVerified: false },
    mobile: { value: res.m, isVerified: false },
    nonce: { value: res.n, isVerified: false },
  });

  if (response?.error) {
    return response;
  }
  const { sig, a, nonce, v } = response;
  const nonceNotToOld = Date.now() - nonce.value >= 300000;
  if (!nonceNotToOld) {
    const web3Instance = new Web3(
      new Web3.providers.HttpProvider("https://rpc.fuse.io/")
    );
    const dataToRecover = { ...response };
    delete dataToRecover.sig;
    const userRecoveredWalletAddress = web3Instance.eth.accounts.recover(
      JSON.stringify(dataToRecover),
      sig
    );
    if (userRecoveredWalletAddress === a.value) {
      const identityContract = new web3Instance.eth.Contract(
        IdentityABI.abi as any,
        (ContractsAddress as any)[env?.REACT_APP_NETWORK ?? "fuse"].Identity,
        { from: a.value }
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
        console.log(e);
        return { ...transformObject(response), verifiedResponse: false };
      }
    } else {
      return { ...transformObject(response), verifiedResponse: false };
    }
  } else {
    return { ...transformObject(response), verifiedResponse: false };
  }
};
