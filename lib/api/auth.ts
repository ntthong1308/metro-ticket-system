import axios from "axios";
import type {
  SignupRequest,
  SignupResponse,
  CheckEmailResponse,
} from "@/types/auth";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function registerUser(
  data: SignupRequest
): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>(
    "/api/auth/register",
    data
  );
  return response.data;
}

export async function checkEmailExists(
  email: string
): Promise<CheckEmailResponse> {
  const response = await apiClient.get<CheckEmailResponse>(
    `/api/auth/check-email`,
    {
      params: { email },
    }
  );
  return response.data;
}
