import { ObjectOrArray, ValidationErrorType } from "@/types/common.type";

export interface IResponse {
  data?: ObjectOrArray | Record<string, ObjectOrArray>;
  status: number;
}

export interface IErrorResponse extends IResponse {
  error?: ValidationErrorType;
  success: boolean;
  message: string;
}
