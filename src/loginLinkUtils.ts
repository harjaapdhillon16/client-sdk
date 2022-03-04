interface Props {
  /* v: name of vendor */
  v: string;
  /* web: vendor url */
  web: string;
  /* id: vendor whitelisted G$ address */
  id: string;
  /* cbu: callback url */
  cbu: string;
  /* rdu: redirect url */
  rdu: string;
  /* r: an array with extra user information fields requested (ie mobile,location,email,avatar,name) */
  r: Array<string>;
}

export const createLoginLink = ({ v, web, id, cbu, rdu, r }: Props) => {
  const websiteLink = "https://wallet.gooddollar.org/loginwith/?login=";
  const objectToEncode = { v, web, id, cbu, rdu, r };
  const encodedString = btoa(JSON.stringify(objectToEncode));
  return `${websiteLink}${encodeURIComponent(encodedString)}`;
};

export const parseLoginLink = (link:string) => {
  return JSON.parse(atob(decodeURIComponent(link)));
};
