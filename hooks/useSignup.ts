"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerUser } from "@/lib/api/auth";
import type { SignupRequest } from "@/types/auth";

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signup = async (data: SignupRequest) => {
    setIsLoading(true);
    try {
      const response = await registerUser(data);

      if (response.success) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập", {
          duration: 4000,
        });
        router.push("/auth/login?registered=true");
      } else {
        toast.error(response.message || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Đã có lỗi xảy ra. Vui lòng thử lại.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
}
