import { DataResponse } from "../../models/base.interface";
import AXIOS_INSTANCE from "../axiosClient";
import { UserDTO } from "./user.interface";

export class UserService {
  url: string = "/users";

  getList = async (): Promise<DataResponse<UserDTO[]>> => {
    return await AXIOS_INSTANCE.get(`${this.url}`);
  };

  delete = async (email: string): Promise<DataResponse<any>> => {
    return await AXIOS_INSTANCE.delete(`${this.url}/${email}`);
  };
}
