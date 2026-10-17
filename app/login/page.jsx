"use client"

import { reciveUserResponse } from "@/redux/user/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const validate = () => {
        if (!form.email.trim()) return "ایمیل را وارد کنید";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return "فرمت ایمیل صحیح نیست";
        if (form.password.length < 6) return "رمز عبور باید حداقل ۶ کاراکتر باشد";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,      
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "ایمیل یا رمز عبور اشتباه است"); // ★ به جای alert
                return;
            }

            dispatch(reciveUserResponse(data.user));
            router.push("/"); // ★ به جای window.location
        } catch (err) {
            setError(err.message || "خطا در ورود، دوباره تلاش کنید");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
            {/* کارت لاگین */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* بخش بالای کارت */}
                <div className="bg-gradient-to-l from-blue-600 to-cyan-500 px-8 py-10 text-center text-white relative overflow-hidden">
                    {/* دایره‌های تزئینی */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-14 -left-8 w-40 h-40 bg-white/10 rounded-full" />

                    <Link href="/" className="inline-flex items-center gap-2 mb-4 relative">
                        <span className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center font-black text-2xl shadow-lg">
                            E
                        </span>
                    </Link>
                    <h1 className="text-2xl font-black mb-1 relative">خوش آمدید! 👋</h1>
                    <p className="text-blue-100 text-sm relative">
                        برای ادامه، وارد حساب کاربری خود شوید
                    </p>
                </div>

                {/* فرم */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {/* پیام خطا */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M12 9v2m0 4h.01M5 19h14a2 2 0 001.84-2.75L13.74 4a2 2 0 00-3.48 0L3.16 16.25A2 2 0 005 19z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* ایمیل */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                            ایمیل
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                dir="ltr"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full h-12 px-4 pr-11 rounded-xl bg-gray-50 border border-gray-200
                  focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100
                  outline-none text-sm transition text-left"
                            />
                            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* رمز عبور */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                            رمز عبور
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                dir="ltr"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full h-12 px-4 pr-11 pl-11 rounded-xl bg-gray-50 border border-gray-200
                  focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100
                  outline-none text-sm transition text-left"
                            />
                            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>

                            {/* دکمه نمایش/مخفی رمز */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="نمایش رمز عبور"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* فراموشی رمز */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400" />
                            مرا به خاطر بسپار
                        </label>
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition">
                            فراموشی رمز عبور؟
                        </a>
                    </div>

                    {/* دکمه ورود */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 flex items-center justify-center gap-2 rounded-xl
              bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600
              text-white text-sm font-bold shadow-lg shadow-blue-200
              transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                در حال ورود...
                            </>
                        ) : (
                            "ورود به حساب"
                        )}
                    </button>

                    {/* ثبت‌نام */}
                    <p className="text-center text-sm text-gray-500">
                        حساب کاربری نداری؟{" "}
                        <Link href="/register" className="text-blue-600 hover:text-blue-800 font-bold transition">
                            ثبت‌نام کن
                        </Link>
                    </p>
                </form>
            </div>

            {/* دکمه بازگشت */}
            <Link
                href="/"
                className="fixed top-5 right-5 flex items-center gap-2 bg-white/20 hover:bg-white/30
          backdrop-blur text-white text-sm font-semibold px-4 py-2.5 rounded-full
          border border-white/30 transition"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                بازگشت به فروشگاه
            </Link>
        </div>
    );
}