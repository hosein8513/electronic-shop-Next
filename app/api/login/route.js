import { NextResponse } from "next/server";
import db from "@/data/db.json";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const users = db.users;

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "Email or password is incorrect",
        },
        {
          status: 401,
        }
      );
    }

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    // ایجاد Session Cookie
    res.cookies.set("session", String(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}