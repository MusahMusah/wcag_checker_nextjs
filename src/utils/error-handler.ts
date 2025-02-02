import { toast } from "sonner";
import { IErrorResponse } from "@/interfaces/common.interface";
import { ValidationErrorType } from "@/types/common.type";

class ErrorHandler {
  static handleError(error: IErrorResponse, timer: number = 5000) {
  console.log(error);
  
    if (error.status === 422) {
      ErrorHandler.handleValidationErrors(error.error!);
    } else {
      const message = ErrorHandler.extractErrorMessage(error.message);
      toast.error(message, {
        duration: timer,
      });
    }
  }

  private static handleValidationErrors(data: ValidationErrorType) {
    Object.keys(data).forEach((key) => {
      const errors = data[key];
      if (Array.isArray(errors)) {
        errors.forEach((error: string) => {
          toast.error(error);
        });
      }
    });
  }

  private static extractErrorMessage(message: string): string {
    if (message) {
      return message;
    }
    return "An error occurred.";
  }
}

export default ErrorHandler;
