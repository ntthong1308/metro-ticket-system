// In-memory user store for demonstration purposes.
// Replace with a real database (e.g., PostgreSQL via Prisma) in production.
export interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// Module-level singleton shared across API routes within the same Node.js process.
export const userStore: StoredUser[] = [];

export function findUserByEmail(email: string): StoredUser | undefined {
  return userStore.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}
