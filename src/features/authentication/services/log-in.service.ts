import axios from "axios";
import { env } from "@/config/env";
import { ILogInDto, ILogInResponse } from "../dto";

export const logIn = async (logInDto: ILogInDto): Promise<ILogInResponse> => {
  const apiUrl = `${env.coreApi.baseUrl}/auth/sign-in`;

  const response = await axios.post<ILogInResponse>(apiUrl, logInDto, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

