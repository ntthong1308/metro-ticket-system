import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().toLowerCase(),
  phone: z.string().regex(/^0\d{9,10}$/),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});

// In-memory store for demonstration purposes.
// Replace with a real database (e.g., PostgreSQL via Prisma) in production.
const users: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
}> = [];

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Dữ liệu không hợp lệ",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { name, email, phone, password } = validationResult.data;

    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email này đã được đăng ký" },
        { status: 409 }
      );
    }

    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const now = new Date().toISOString();
    const newUser = {
      id: uuidv4(),
      name,
      email: email.toLowerCase(),
      phone,
      password_hash,
      role: "passenger",
      created_at: now,
      updated_at: now,
    };

    users.push(newUser);

    return NextResponse.json(
      {
        success: true,
        message: "Đăng ký thành công",
        data: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Đã có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
