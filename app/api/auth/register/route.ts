import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { userStore, findUserByEmail } from "@/lib/store/users";

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

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email này đã được đăng ký" },
        { status: 409 }
      );
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "12", 10);
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

    userStore.push(newUser);

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

