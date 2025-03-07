import axios from "axios";
import { env } from "@/config/env";
import { ISignUpDto, ISignUpResponse } from "../dto";

export const signUp = async (
  signUpDto: ISignUpDto
): Promise<ISignUpResponse> => {
  const apiUrl = `${env.coreApi.baseUrl}/auth/sign-up`;

  const response = await axios.post<ISignUpResponse>(apiUrl, signUpDto, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
