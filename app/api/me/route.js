import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ۱. خواندن کوکی session (httpOnly است و فقط سرور می‌خواندش)
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    // ۲. کاربر لاگین نیست → کاربر خالی برمی‌گردانیم (بدون خطا)
    if (!session) {
      return NextResponse.json({ user: null });
    }

    // ۳. گرفتن اطلاعات کاربر از json-server با همون id داخل کوکی
    const response = await fetch(
      `http://localhost:3000/users/${session.value}`
    );

    if (!response.ok) {
      return NextResponse.json({ user: null });
    }

    const user = await response.json();

    // ۴. فقط فیلدهای امن را برمی‌گردانیم (پسورد هرگز!)
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}