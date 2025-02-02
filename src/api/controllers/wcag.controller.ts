import { CHECK_WCAG } from "@/api/routes";
import { axiosInstance } from "@/api/axios";
import { formatErrorResponse } from "@utils/helpers";
import { IWCAGResponse } from "@/interfaces/wcag.interface";

export class WcagController {
  public static async check(data: FormData): Promise<IWCAGResponse> {
    return new Promise(async (resolve, reject) => {
      await axiosInstance
        .post(CHECK_WCAG(), data)
        .then((res) => resolve(res.data))
        .catch((e) => reject(formatErrorResponse(e.response)));
    });
  }
}
