import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/data/db.json";

export async function GET() {
  try {
    // ۱. خواندن کوکی session (httpOnly است و فقط سرور می‌خواندش)
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    // ۲. کاربر لاگین نیست → کاربر خالی برمی‌گردانیم (بدون خطا)
    if (!session) {
      return NextResponse.json({ user: null });
    }

    // ۳. گرفتن اطلاعات کاربر از db.json با همون id داخل کوکی
    const user = db.users.find((u) => u.id === Number(session.value));

    if (!user) {
      return NextResponse.json({ user: null });
    }

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