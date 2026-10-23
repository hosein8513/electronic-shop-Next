import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/data/db.json";

// همیشه dynamic — هیچ‌وقت کش نشو
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // ۱. خواندن کوکی session (httpOnly است و فقط سرور می‌خواندش)
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    // ۲. کاربر لاگین نیست → کاربر خالی برمی‌گردانیم
    if (!session) {
      return NextResponse.json({ user: null });
    }

    // ۳. مقایسه رشته‌ای id — با عدد یا رشته بودن id در db.json کار می‌کند
    const user = db.users.find(
      (u) => String(u.id) === String(session.value)
    );

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