import { AxiosResponse } from "axios";

export function handleResponse<T>(response: AxiosResponse<T>): T {
  return response.data;
}
