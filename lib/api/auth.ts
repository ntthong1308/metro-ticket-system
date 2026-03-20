import axios from "axios";
import type {
  SignupRequest,
  SignupResponse,
  CheckEmailResponse,
} from "@/types/auth";

// In a browser context, relative URLs resolve against the current origin,
// so an empty string works correctly for same-origin API calls.
// Set NEXT_PUBLIC_API_URL to a full URL when calling an external API server.
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
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
