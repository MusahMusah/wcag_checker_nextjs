import React from "react";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";

interface ButtonLoadingProps extends ButtonProps {
  loading?: boolean;
  message?: string;
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  loading = false,
  message = "Please wait...",
  children,
  ...props
}) => {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? message : children}
    </Button>
  );
};

export default ButtonLoading;
