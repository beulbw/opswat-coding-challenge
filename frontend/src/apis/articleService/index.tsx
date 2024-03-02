import { DataResponse } from "../../models/base.interface";
import AXIOS_INSTANCE from "../axiosClient";
import { ArticleDTO } from "./article.interface";

export class ArticleService {
  url: string = "/articles";

  getList = async (): Promise<DataResponse<ArticleDTO[]>> => {
    return await AXIOS_INSTANCE.get(`${this.url}`);
  };

  create = async (request: ArticleDTO): Promise<DataResponse<any>> => {
    return await AXIOS_INSTANCE.post(`${this.url}`, request);
  };

  update = async (request: ArticleDTO): Promise<DataResponse<any>> => {
    return await AXIOS_INSTANCE.put(`${this.url}/${request.id}`, request);
  };

  delete = async (id: number): Promise<DataResponse<any>> => {
    return await AXIOS_INSTANCE.delete(`${this.url}/${id}`);
  };

  favourite = async (id: number): Promise<DataResponse<any>> => {
    return await AXIOS_INSTANCE.post(`${this.url}/${id}/favourite`);
  };

  unfavourite = async (id: number): Promise<DataResponse<any>> => {
    return await AXIOS_INSTANCE.delete(`${this.url}/${id}/favourite`);
  };
}
