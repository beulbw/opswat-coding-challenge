import { DataResponse } from "../../models/base.interface";
import AXIOS_INSTANCE from "../axiosClient";
import { LoginRequest, RegisterRequest } from "./auth.interface";

export class AuthenticationService {
  url: string = "";

  login = async (request: LoginRequest): Promise<DataResponse<any>> => {
    return await AXIOS_INSTANCE.post(`${this.url}/login`, request);
  };

  register = async (request: RegisterRequest): Promise<DataResponse<any>> => {
    return await AXIOS_INSTANCE.post(`${this.url}/users`, request);
  };
}
