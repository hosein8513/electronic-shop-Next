import db from "@/data/db.json";

export const getUserInfo = async (id) => {
    const user = db.users.find((u) => u.id === Number(id));

    if (!user) {
        throw new Error('خطا در دریافت اطلاعات کاربر')
    }

    return user
}