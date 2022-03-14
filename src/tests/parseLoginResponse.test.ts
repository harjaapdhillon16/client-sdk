import { parseLoginResponse } from "../parseLoginResponse";
import { sampleGooddollarSignedObject, parsedResult } from "./data";

it("parseLoginResponse method should return the correct value", async () => {
  const parseLoginObject = await parseLoginResponse(
    sampleGooddollarSignedObject
  );
  expect(parseLoginObject).toStrictEqual({
    ...parsedResult,
    verifiedResponse: true,
  });
}, 10000);

it("parseLoginResponse method should return the verfiedReponse false when given the incorrect value", async () => {
  const parseLoginObject = await parseLoginResponse({
    ...sampleGooddollarSignedObject,
    a: "0x9E6Ea049A281F513a2BAbb106AF1E023FEEeCfA",
  });
  expect(parseLoginObject).toStrictEqual({
    ...parsedResult,
    a: "0x9E6Ea049A281F513a2BAbb106AF1E023FEEeCfA",
    verifiedResponse: false,
  });
}, 10000);
