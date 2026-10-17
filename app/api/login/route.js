import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Unable to connect to database",
        },
        {
          status: 500,
        }
      );
    }

    const users = await response.json();

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

