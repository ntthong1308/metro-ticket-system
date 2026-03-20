export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "passenger" | "admin" | "staff";
  created_at: string;
  updated_at: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface CheckEmailResponse {
  exists: boolean;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
